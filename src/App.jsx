import { CartProvider } from './context/CartContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Menu from './components/Menu'
import OrderSummary from './components/OrderSummary'

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <main>
            <Menu />
            <OrderSummary />
          </main>
        </div>
      </CartProvider>
    </ThemeProvider>
  )
}
