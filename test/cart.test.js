import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateTotals, cartReducer, formatMoney } from '../src/cart.js'

const drip = { id: 1, name: 'Monon Drip', priceCents: 325 }
const latte = { id: 2, name: 'Trail Latte', priceCents: 475 }

test('adding existing and distinct items preserves their quantities', () => {
  let cart = cartReducer([], { type: 'add', item: drip })
  cart = cartReducer(cart, { type: 'add', item: drip })
  cart = cartReducer(cart, { type: 'add', item: latte })
  assert.deepEqual(cart.map(({ id, quantity }) => [id, quantity]), [[1, 2], [2, 1]])
})

test('adjusting, removing and clearing operate on the latest cart', () => {
  let cart = cartReducer([], { type: 'add', item: drip })
  cart = cartReducer(cart, { type: 'adjust', id: 1, delta: 1 })
  cart = cartReducer(cart, { type: 'adjust', id: 1, delta: 1 })
  assert.equal(cart[0].quantity, 3)
  cart = cartReducer(cart, { type: 'adjust', id: 1, delta: -1 })
  assert.equal(cart[0].quantity, 2)
  cart = cartReducer(cart, { type: 'remove', id: 1 })
  assert.deepEqual(cart, [])
  cart = cartReducer([], { type: 'add', item: drip })
  assert.deepEqual(cartReducer(cart, { type: 'adjust', id: 1, delta: -1 }), [])
  assert.deepEqual(cartReducer(cart, { type: 'clear' }), [])
  assert.throws(() => cartReducer(cart, { type: 'unknown' }), /Unknown cart action/)
})

test('totals round tax once to cents and add the displayed amounts', () => {
  const totals = calculateTotals([{ ...drip, quantity: 1 }, { ...latte, quantity: 1 }])
  assert.deepEqual(totals, { totalItems: 2, subtotalCents: 800, taxCents: 56, totalCents: 856 })
  const rounded = calculateTotals([{ ...drip, quantity: 1 }])
  assert.equal(rounded.taxCents, 23)
  assert.equal(rounded.totalCents, 348)
  assert.equal(formatMoney(rounded.totalCents), '$3.48')
  assert.deepEqual(calculateTotals([]), { totalItems: 0, subtotalCents: 0, taxCents: 0, totalCents: 0 })
})
