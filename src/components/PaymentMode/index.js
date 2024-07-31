import {useContext, useState} from 'react'

import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptions = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'Wallet',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

const PaymentMode = () => {
  const {cartList} = useContext(CartContext)

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setOrderPlaced] = useState(false)

  const updatePaymentMethod = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }

  const onPlaceOrder = () => {
    setOrderPlaced(true)
  }

  const getTotalPriceAmount = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const renderPaymentMethodsInputs = () => (
    <ul className="payment-method-inputs">
      {paymentOptions.map(eachMethod => (
        <li key={eachMethod.id} className="payment-method-input-container">
          <input
            className="payment-method-input"
            id={eachMethod.id}
            type="radio"
            name="paymentMethod"
            disabled={eachMethod.isDisabled}
            onChange={updatePaymentMethod}
          />
          <label
            className={`payment-method-label ${
              eachMethod.isDisabled ? 'disabled-label' : ''
            }`}
            htmlFor={eachMethod.id}
          >
            {eachMethod.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="payments-container">
      {isOrderPlaced ? (
        <p className="success-message">
          Your order has been placed successfully
        </p>
      ) : (
        <>
          <h1 className="payments-heading">Payments Details</h1>
          <p className="payments-sub-heading">Payment Method</p>
          {renderPaymentMethodsInputs()}
          <div className="order-details">
            <p className="payments-sub-heading">Order details:</p>
            <p>Quantity: {cartList.length}</p>
            <p>Total Price: Rs {getTotalPriceAmount()}/-</p>
          </div>
          <button
            disabled={paymentMethod === ''}
            type="button"
            className="confirm-order-button"
            onClick={onPlaceOrder}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default PaymentMode
