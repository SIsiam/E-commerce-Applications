import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const SimpleForm = ({handlePayment}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentErorr, setPaymentErorr] = useState(null)
    const [paymentSuccess, setPaymentSuccess] = useState(null)

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentErorr(error.message)
            setPaymentSuccess(null)
            console.log('[error]', error);
        } else {
            setPaymentSuccess(paymentMethod.id)
            setPaymentErorr(null)
            handlePayment(paymentMethod.id)
            console.log('[PaymentMethod]', paymentMethod);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
          </button>
            </form>
            {
                paymentErorr && <p className="text-danger"> {paymentErorr} </p>
            }

            {
                paymentSuccess && <h2 className="text-success"> Your Paymnet SuccessFull </h2>
            }

        </div>
    );
};

export default SimpleForm;