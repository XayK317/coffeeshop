import test from 'node:test'
import assert from 'node:assert/strict'
import source from '../src/data/menu.json' with { type: 'json' }
import { menuData } from '../src/data/menu.js'
import { calculateTotals, cartReducer } from '../src/cart.js'

test('menu preserves the supplied items and groups them by category', () => {
  assert.deepEqual(menuData.map(({ category }) => category), ['Coffee', 'Tea', 'Pastries', 'Breakfast'])
  const items = menuData.flatMap(({ category, items }) => {
    assert.ok(items.every((item) => item.category === category))
    return items
  })
  assert.equal(items.length, 12)
  assert.equal(new Set(items.map((item) => item.id)).size, items.length)
  assert.deepEqual(items.map(({ priceCents, ...item }) => item), source)
  assert.ok(items.every((item) => item.priceCents === Math.round(item.price * 100)))
})

test('supplied menu prices are used in cart totals', () => {
  const espresso = menuData[0].items.find((item) => item.name === 'Espresso')
  const toast = menuData[3].items.find((item) => item.name === 'Avocado Toast')
  let cart = cartReducer([], { type: 'add', item: espresso })
  cart = cartReducer(cart, { type: 'add', item: toast })
  assert.deepEqual(calculateTotals(cart), {
    totalItems: 2, subtotalCents: 1150, taxCents: 81, totalCents: 1231
  })
})
