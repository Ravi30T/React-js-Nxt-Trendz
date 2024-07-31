import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    quantity: 1,
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  /*
  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  } */
  addCartItem = product => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (product.id === each.id) {
          return {
            id: product.id,
            quantity: product.quantity + each.quantity,
            price: product.price,
            title: product.title,
            brand: product.brand,
            imageUrl: product.imageUrl,
          }
        }
        return each
      }),
      ...(prevState.cartList.some(item => item.id === product.id)
        ? {}
        : {cartList: [...prevState.cartList, product]}),
    }))
  }

  onIncrementCartItem = product => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(each => each.id !== product.id),
        product,
      ],
    }))
  }

  onDecrementCartItem = product => {
    if (product.quantity !== 0) {
      this.setState(prevState => ({
        cartList: [
          ...prevState.cartList.filter(each => each.id !== product.id),
          product,
        ],
      }))
    } else {
      console.log(product.id)
      this.onRemoveEachCartItem(product.id)
    }
  }

  onRemoveEachCartItem = id => {
    const {cartList} = this.state
    console.log(id)
    const updatedCartList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.onIncrementCartItem,
          decrementCartItemQuantity: this.onDecrementCartItem,
          removeCartItem: this.onRemoveEachCartItem,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
