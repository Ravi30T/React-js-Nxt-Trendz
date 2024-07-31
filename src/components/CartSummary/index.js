// Write your code here

import Popup from 'reactjs-popup'

import CartContext from '../../context/CartContext'
import PaymentMode from '../PaymentMode'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalBill = () => {
        let totalBillAmount = 0
        cartList.map(each => (totalBillAmount += each.quantity * each.price))
        return totalBillAmount
        // const {quantity, price} = cartList[0]
      }
      return (
        <div className="check-out-container">
          <div>
            <h1 className="total-price-heading">
              Order Total:{' '}
              <span className="total-price">Rs {totalBill()}/-</span>
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              modal
              trigger={
                <button className="check-out" type="button">
                  Checkout
                </button>
              }
              position="top left"
            >
              {close => <PaymentMode close={close} />}
            </Popup>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
