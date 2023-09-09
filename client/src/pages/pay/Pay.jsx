// import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
// import "./Pay.scss";
// // import { loadStripe } from "@stripe/stripe-js";
// // import { Elements } from "@stripe/react-stripe-js";
// import newRequest from "../../utils/newRequest";
// import { useParams } from "react-router-dom";
// import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// // const stripePromise = loadStripe(
// //   "pk_test_51NUFHGSFwnpGRs91ATa4xO9nR1dXNZ7loG9EgNHCXgOpNgZQe7RpHZFlWQ44xCLZ2Dti8PKZYzPaZ9WW5fsNUr0800H12OHIpB"
// // );

// const Pay = () => {
//   return (
//     <div className="pay">
//       {/* <Helmet>
//         <meta http-equiv="Content-Security-Policy" content="frame-src *;" />
//         <meta
//           http-equiv="Content-Security-Policy"
//           content="img-src 'self' data:"
//         />
//       </Helmet> */}
//       <CheckoutForm />

//       {/* <Elements >
//           <CheckoutForm />
//         </Elements> */}
//     </div>
//   );
// };

// export default Pay;
import React from "react";

const Pay = () => {
  const handlePay = async () => {
    const response = await fetch(
      "https://gigster-backend-algokings.onrender.com/api/checkout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            // Define your line items here
            { price: "price_123", quantity: 1 },
          ],
        }),
      }
    );

    const data = await response.json();
    window.location.href = data.url;
  };

  return <button onClick={handlePay}>Pay now</button>;
};
export default Pay;
