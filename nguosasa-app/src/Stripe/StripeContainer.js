import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
  'pk_test_51Hig1vE9WbRKB296rqAB6ybb9bo8CgwNWGCsfE8Yn05mSLS56dVFxvZqZPaE08TPljZ06mcdtypegM0yzOP9hGlW00XnYgRwKT'
);
export default function stripeContainer() {
  return (
    <div className="mvls-main">
      <div className="body-stripe">
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
