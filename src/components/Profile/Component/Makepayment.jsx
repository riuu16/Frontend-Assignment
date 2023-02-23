import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  FormLabel,
  FormCheck,
  FormText,
} from "react-bootstrap";
import Payment from "./Payment";

const MakePayment = () => {
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");

  const handlePlanSelect = (selectedPlan) => {
    setPlan(selectedPlan);

    // Set the price based on the selected plan here
    if (selectedPlan === "planA") {
      setPrice("999");
    } else if (selectedPlan === "planB") {
      setPrice("1999");
    } else if (selectedPlan === "planC") {
      setPrice("2999");
    } else {
      setPrice(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // alert(price);
    setModalShow(true)
  };

  // console.log(plan,price)
  // const onSubmit = async (values) => {
  //   const plan = "Plan A";
  //   const value = "$999";
  //   const updatedValue = {
  //     plan: plan,
  //     value: value,
  //   };
  //   console.log(JSON.stringify(updatedValue));
  //   alert(JSON.stringify(updatedValue));
  // };

  return (
    <Fragment>
      <Payment
        show={modalShow}
        onHide={() => setModalShow(false)}
        plan={plan}
        price={price}
      />

      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto py-3"
          style={{ width: "40rem" }}
        >
          <h2 className="mx-auto">Make Payment</h2>
          <Form className="mx-5 px-3" onSubmit={onSubmit}>
            <FormGroup className="mb-3" controlId="formBasicPlan">
              <FormLabel>Select a plan to proceed with payment:</FormLabel>
              <div className="d-flex flex-column">
                <FormCheck
                  type="radio"
                  label="$999 Plan A"
                  name="plan"
                  value="planA"
                  required 
                  checked={plan === "planA"}
                  onChange={(e) => handlePlanSelect(e.target.value)}
                />
                <FormCheck
                  type="radio"
                  label="$1999 Plan B"
                  name="plan"
                  value="planB"
                  required
                  checked={plan === "planB"}
                  onChange={(e) => handlePlanSelect(e.target.value)}
                />
                <FormCheck
                  type="radio"
                  label="$2999 Plan C"
                  name="plan"
                  value="planC"
                  required
                  checked={plan === "planC"}
                  onChange={(e) => handlePlanSelect(e.target.value)}
                />
              </div>
              <FormText className="text-danger"></FormText>
            </FormGroup>
            <Button
              type="submit"
              // onClick={() =>
              //   setModalShow(true) || setPlan("Plan-B") || setPrice("1999")
              // }
              bg="primary"
            >
              Proceed to Payment
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default MakePayment;
