/* eslint-disable no-unused-vars */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import UseTitle from "../component/hook/useTitle";
import Checkout from "./Checkout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_PK);

export default function Payment() {
  const data = useLoaderData();

  // eslint-disable-next-line no-unused-vars
  const {
    treatmentName,
    appointMentDate,
    appointmentTime,
    patientName,
    price,
  } = data || {};

  UseTitle("Payment");

  return (
    <div>
      <div className="text-3xl mt-6">Payment</div>
      <h3 className='text-3xl py-6'>
        payment for {treatmentName}
      </h3>
      <p className='text-xl'>please pay 
        <strong>$ {price}</strong> for your appointment
      </p>

      <div className="w-96 my-6">
        <Elements stripe={stripePromise}>
          <Checkout booking={data}/>
        </Elements>
      </div>
    </div>
  );
}
