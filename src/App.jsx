import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import Products from './components/products/Products'
import Cart from './components/Cart/Cart'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/ChecKoutForm/Checkout/Checkout'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve()
    setCart(response)
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const handleUpdateCardQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      )
      setOrder(incomingOrder)
      refreshCart()
    } catch (err) {
      setErrorMessage(err.data.error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleEmptyCart={handleEmptyCart}
              handleUpdateCardQty={handleUpdateCardQty}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
