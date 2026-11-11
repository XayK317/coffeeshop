import { menuData } from '../data/menu'
import { useCart } from '../context/CartContext'
import { formatMoney } from '../cart'

export default function Menu() {
  const { addToCart } = useCart()

  return (
    <section className="menu-section" aria-labelledby="menu-heading">
      <h2 id="menu-heading">Menu</h2>
      {menuData.map((category) => (
        <section key={category.category} className="category-group">
          <h3>{category.category}</h3>
          <div className="menu-items">
            {category.items.map((item) => (
              <article key={item.id} className="menu-card">
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <footer>
                  <span>{formatMoney(item.priceCents)}</span>
                  <button type="button" onClick={() => addToCart(item)} aria-label={`Add ${item.name} to order`}>
                    Add to order
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  )
}
