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
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log('Stripe 23 | token generated!', paymentMethod);
      try {
        const { id } = paymentMethod;

        const response = await Axios.post('/stripe/charge', {
          customer: 'cus_IL6oS7cFj1zS3e',
          id: id,
          amount: 34449,
        });
        console.log('stripe35 | data', response.data.success);

        if (response.data.success) {
          console.log('CheckoutForm.js 25 | payment successful!');
          alert('Payment is succeful', ProductList);
          return <ProductList />;
        }
      } catch (error) {
        console.log('CheckoutForm.js 28 | ', error);
      }
      //send token to backend here
    } else {
      console.log(error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <CardElement />
      <button>Pay</button>
    </form>
  );
};
export default CheckoutForm;
