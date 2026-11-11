import menuItems from './menu.json' with { type: 'json' }

const categories = new Map()

for (const item of menuItems) {
  if (!categories.has(item.category)) categories.set(item.category, [])
  categories.get(item.category).push({
    ...item,
    priceCents: Math.round(item.price * 100)
  })
}

export const menuData = Array.from(categories, ([category, items]) => ({ category, items }))
