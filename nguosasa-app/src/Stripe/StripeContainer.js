import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import './Stripe.css';

const PUBLIC_KEY =
  'pk_test_51Hig1vE9WbRKB296rqAB6ybb9bo8CgwNWGCsfE8Yn05mSLS56dVFxvZqZPaE08TPljZ06mcdtypegM0yzOP9hGlW00XnYgRwKT';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
