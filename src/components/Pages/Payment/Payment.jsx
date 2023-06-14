import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from './CHeckOut';
const stripePromise = loadStripe('pk_test_51NEmG3IxzytApYUlrVvQjOkLBL4TdwZ6aTq4Mz4FnMKHgzjX83FRLIjyEjCddXis3csWUdu0pnLWkkt5QSxJAjb300a5y8iSib');
const Payment = () => {
    const course=useLoaderData();
    console.log(course)
    const price=course?.course?.price;
    const discount=course?.course?.discount;

    const fixedMoney=parseFloat(price-discount)
    const tk = parseFloat(fixedMoney.toFixed(2));
    return (
        <div>
            <h1 className='text-center text-3xl'>Please Payment : ${tk}</h1>
            <Elements stripe={stripePromise}>
                <CheckOut price={price} _id={course._id}  course={course}></CheckOut>
            </Elements>
        </div>
    );
};

export default Payment;