import { Fragment } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const PaymentTwo = () => {
  const navigate = useNavigate();
  const OnClikeHandler = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto p-5"
          style={{ width: "40rem" }}
        >
          <h3 className="mx-auto">Payment Successful</h3>
          <p className="mx-auto my-3">
            Thank you for your payment. An email with an OTP has been sent to
            your registered email address. Please check your email and enter the
            OTP in the form below to confirm your payment.
          </p>
          <Button onClick={OnClikeHandler} bg="primary">Click here</Button>

          {/* Insert OTP form here */}
        </Card>
      </Container>
    </Fragment>
  );
};

export default PaymentTwo;