import { Box, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

//const stripePromise = loadStripe("");

const Payment = () => {
  const location = useLocation();
  const { price } = location.state || {};

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "20px",
        marginLeft: "50px",
        marginRight: "50px",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Payment{" "}
      </Typography>
      
      {/* <Elements stripe={stripePromise}>
        <CheckoutForm price={price}></CheckoutForm>
      </Elements> */}
    </Box>
  );
};

export default Payment;
