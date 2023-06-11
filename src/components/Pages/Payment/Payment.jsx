import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from './CHeckOut';
const stripePromise = loadStripe('pk_test_51NEmG3IxzytApYUlrVvQjOkLBL4TdwZ6aTq4Mz4FnMKHgzjX83FRLIjyEjCddXis3csWUdu0pnLWkkt5QSxJAjb300a5y8iSib');
const Payment = () => {
    const { price,discount } = useLoaderData();
    const fixedMoney=parseFloat(price-discount)
    console.log(price)
    const tk = parseFloat(fixedMoney.toFixed(2));
    return (
        <div>
            <h1>Please Payment : ${tk}</h1>
            <Elements stripe={stripePromise}>
                <CheckOut price={price}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;