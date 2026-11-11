import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { totalItems } = useCart()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <h1>Monon Grind</h1>
      <div className="header-actions">
        <a className="cart-link" href="#order-summary" aria-label={`Cart: ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}>
          Cart <span className="cart-badge" aria-hidden="true">{totalItems}</span>
        </a>
        <button type="button" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark mode' : 'Light mode'}
        </button>
      </div>
    </header>
  )
}
