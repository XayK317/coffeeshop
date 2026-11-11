import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatMoney } from '../cart'

export default function OrderSummary() {
  const { cart, adjustQuantity, removeFromCart, clearCart, subtotalCents, taxCents, totalCents } = useCart()
  const [confirmedTotal, setConfirmedTotal] = useState(null)

  const handlePlaceOrder = () => {
    if (cart.length === 0) return
    setConfirmedTotal(totalCents)
    clearCart()
  }

  return (
    <aside id="order-summary" className="summary-section" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Order Summary</h2>
      <p className="order-notice">Orders are not sent and payments are not processed.</p>
      <div role="status" aria-live="polite">
        {confirmedTotal !== null && (
          <div className="confirmation">
            <strong>Order prepared</strong>
            <p>Order total: {formatMoney(confirmedTotal)}</p>
          </div>
        )}
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <div>{formatMoney(item.priceCents * item.quantity)}</div>
              </div>
              <div className="cart-item-controls">
                <button type="button" onClick={() => adjustQuantity(item.id, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button>
                <span aria-label={`${item.name} quantity: ${item.quantity}`}>{item.quantity}</span>
                <button type="button" onClick={() => adjustQuantity(item.id, 1)} aria-label={`Increase ${item.name} quantity`}>+</button>
                <button type="button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>Remove</button>
              </div>
            </div>
          ))}
          <div className="totals">
            <div><span>Subtotal</span><span>{formatMoney(subtotalCents)}</span></div>
            <div><span>Tax (7%)</span><span>{formatMoney(taxCents)}</span></div>
            <div className="final"><span>Total</span><span>{formatMoney(totalCents)}</span></div>
          </div>
          <button type="button" className="place-order-btn" onClick={handlePlaceOrder}>
            Place order
          </button>
        </div>
      )}
    </aside>
  )
}
