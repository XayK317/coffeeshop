export function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const existing = cart.find((item) => item.id === action.item.id)
      return existing
        ? cart.map((item) => item.id === action.item.id
          ? { ...item, quantity: item.quantity + 1 }
          : item)
        : [...cart, { ...action.item, quantity: 1 }]
    }
    case 'adjust':
      return cart
        .map((item) => item.id === action.id
          ? { ...item, quantity: item.quantity + action.delta }
          : item)
        .filter((item) => item.quantity > 0)
    case 'remove':
      return cart.filter((item) => item.id !== action.id)
    case 'clear':
      return []
    default:
      throw new Error(`Unknown cart action: ${action.type}`)
  }
}

export function calculateTotals(cart) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotalCents = cart.reduce((sum, item) => sum + item.priceCents * item.quantity, 0)
  const taxCents = Math.round(subtotalCents * 7 / 100)
  return { totalItems, subtotalCents, taxCents, totalCents: subtotalCents + taxCents }
}

export function formatMoney(cents) {
  return `$${(cents / 100).toFixed(2)}`
}
