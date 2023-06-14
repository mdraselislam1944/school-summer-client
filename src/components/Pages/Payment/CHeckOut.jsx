import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../layout/Providers/AuthProviders';
import swal from 'sweetalert';

const CheckOut = ({ price,course,_id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret,setClientSecret]=useState('');
    const user=useContext(AuthContext)

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({price})
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setClientSecret(data.clientSecret)
                // alert('added successfully');
            })
            .catch(error => console.log(error.message));
    }, [])
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setCardError(error.message);
        }
        else {
            setCardError('');
            console.log(paymentMethod);
        }
        const {paymentIntent,error:confirmedError}=await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method:{
                    card:card,
                    billing_details:{
                        name: user?.user?.displayName,
                        
                    },
                },
            },
        );
        if(confirmedError){
            console.log(confirmedError)
        }
        swal({
            title: paymentIntent?.status,
            text: "Thank you!",
            icon: "payment success",
            button: "ok!",
          });
          const paymentHistory={
            paymentId:paymentIntent.id,
          };
          console.log(paymentHistory)
          console.log(paymentIntent.id)

        //   const paymentId='858747438843873478348734';
          fetch(`http://localhost:5000/studentPayment/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(paymentHistory)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    // alert('update successfully');
                    // form.reset();
                }
                // Navigate('/dashboard');
            })

    };
    return (
        <>
            <form className='w-2/3 m-10' onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='mt-5 btn btn-outline btn-primary' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-red-600'>{cardError}</p>
            }
        </>
    );
};

export default CheckOut;