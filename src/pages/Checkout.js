import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Checkout({ booking }) {
  const [stripeError, setStripeError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [TransactionId, setTransactionId] = useState("");
  const [processingCard, setCardProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const { price,patientName,patientEmail } = booking;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL2}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("jwttoken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((d) => {
        setClientSecret(d.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setStripeError(error.message);
      return
    } else {
      setStripeError("");
      console.log(paymentMethod);
    }
    setCardProcessing(true)

    const {paymentIntent, error:confirmSuccessError} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: patientName,
              email:patientEmail
            },
          },
        },
      );

      if(confirmSuccessError){
        setStripeError(confirmSuccessError.message)
        return 
      }
     
      if(paymentIntent.status === 'succeeded'){
        toast.success("payment successfull")
        setTransactionId(paymentIntent.id)

          
            // fetch for update

      }
      setCardProcessing(false)




  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary mt-4"
        type="submit"
        disabled={!stripe || !clientSecret || processingCard}
      >
        Pay
      </button>
      {stripeError && <p className="text-red-500 mt-4">{stripeError}</p>}
    </form>
  );
}
