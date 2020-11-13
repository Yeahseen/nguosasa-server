import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Axios from 'axios';
import ProductList from '../ProductList';
import './Stripe.css';
export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement, {
        style: {
          base: {
            lineHeight: '1.429',
          },
          font: {},
        },
      }),
    });

    if (!error) {
      console.log('Stripe 23 | token generated!', paymentMethod);
      try {
        const { id } = paymentMethod;

        const response = await Axios.post('/stripe/charge', {
          customer: 'cus_IL6oS7cFj1zS3e',
          id: id,
          amount: 5349 * 100,
        });
        console.log('stripe35 | data', response.data.success);

        if (response.data.success) {
          console.log('CheckoutForm.js 25 | payment successful!');
          alert('Your payment Has been Received Thanks', ProductList);
        }
      } catch (error) {
        console.log('CheckoutForm.js 28 | ', error);
      }
      //send token to backend here
    } else {
      console.log(error.message);
    }
  };

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#c4f0ff',
        color: '	#ffff',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '16px',
        fontSmoothing: 'antialiased',
        '::placeholder': { color: '#87bbfd' },
      },
      invalid: {
        iconColor: '#ffc7ee',
        color: '#ffc7ee',
      },
    },
  };

  return (
    <div className="mvls-container">
      <h1>Please Fill The Form Below</h1>
      <form onSubmit={handleSubmit} options={CARD_OPTIONS}>
        <fieldset className="FormGroup">
          <input
            className="FormRowInput"
            name=" email"
            placeholder="FullName"
          ></input>

          <input
            className="FormRowInput"
            placeholder="Email"
            required="true"
          ></input>

          <input
            className="FormRowInput"
            placeholder="Phone"
            required="true"
          ></input>
        </fieldset>
        <h2>Please Enter Your Card Details</h2>
        <fieldset className="FormGroup">
          <CardElement options={CARD_OPTIONS} />
        </fieldset>

        <button className="SubmitButton" type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
};
export default CheckoutForm;
