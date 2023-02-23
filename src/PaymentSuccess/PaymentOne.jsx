import { Fragment } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentOne = () => {
  const navigate = useNavigate();
  const OnClikeHandler = () => {
    navigate("/");
  };
  return (
    <Fragment>
      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto py-3"
          style={{ width: "40rem" }}
        >
          <h3 className="mx-auto">Thankyou!</h3>
          <p className="mx-auto my-3">
            Thank you please check your email for OTP
          </p>
          <Button onClick={OnClikeHandler} bg="primary">
            Click here
          </Button>

          {/* Insert OTP form here */}
        </Card>
      </Container>
    </Fragment>
  );
};

export default PaymentOne;
