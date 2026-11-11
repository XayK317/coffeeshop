import { createContext, useContext, useReducer } from 'react'
import { calculateTotals, cartReducer } from '../cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const totals = calculateTotals(cart)

  const addToCart = (item) => dispatch({ type: 'add', item })
  const adjustQuantity = (id, delta) => dispatch({ type: 'adjust', id, delta })
  const removeFromCart = (id) => dispatch({ type: 'remove', id })
  const clearCart = () => dispatch({ type: 'clear' })

  return (
    <CartContext.Provider value={{ cart, addToCart, adjustQuantity, removeFromCart, clearCart, ...totals }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
