import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);

      //sending token to backend here
      try {
        const { id } = paymentMethod;
        const response = await axios.post('api/orders', {
          amount: 999,
          id: id,
        });
        if (response.data.success) {
          console.log('payment successful');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div className="mvls-container">
      <div className="login-form">
        <h1> Checkout Form</h1>
        <form action="post" onSubmit={handleSubmit}>
          <input id="checkout" type="hidden" name="checkout" />

          <input
            type="text"
            name="Fullname"
            required="true"
            placeholder="Name"
          />

          <input type="text" name="Email" required="true" placeholder="Email" />
          <input
            type="Address"
            name="address"
            required="true"
            placeholder="Address"
          />
          <input
            type="number"
            name="Telephone"
            placeholder="Phone"
            maxlenth="10"
            required
          ></input>

          <CardElement />
          <button className="btn btn-primary btn-purchase">Pay</button>
        </form>
      </div>
    </div>
  );
};
