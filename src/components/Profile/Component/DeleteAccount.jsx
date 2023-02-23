import { Fragment, useEffect, useState } from "react";
import { FormLabel } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Userservices from "../../../services/user.services";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  FormCheck,
} from "react-bootstrap";

const formSchema = yup.object().shape({
  reason: yup
    .string()
    .required("Please select a reason for deleting your account"),
});

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (value) => {
    
    console.log(JSON.stringify(value));
    alert(JSON.stringify(value));
    try {
      // Make API call to delete account with the selected reason
      // await Userservices.deleteAccount(reason);

      // Redirect to login page after successful deletion
      // navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   // Redirect to login page if user is not logged in
  //   if (cookies.get("user") === undefined) {
  //     navigate("/login");
  //   }
  // };

  return (
    <Fragment>
      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto py-3"
          style={{ width: "40rem" }}
        >
          <h2 className="mx-auto">Delete Account</h2>
          <Form
            className="mx-5 px-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup className="mb-3" controlId="formBasicReason">
              <FormLabel>
                Select a reason for deleting your account credentials:
              </FormLabel>
              <FormCheck
                type="radio"
                label="Reason 1"
                name="reason"
                value="reason1"
                {...register("reason")}
              />
              <FormCheck
                type="radio"
                label="Reason 2"
                name="reason"
                value="reason2"
                {...register("reason")}
              />
              <FormCheck
                type="radio"
                label="Reason 3"
                name="reason"
                value="reason3"
                {...register("reason")}
              />
              <FormCheck
                type="radio"
                label="Reason 4"
                name="reason"
                value="reason4"
                {...register("reason")}
              />
              {errors.reason && (
                <p className="text-danger">{errors.reason.message}</p>
              )}
            </FormGroup>
            <Button type="submit" bg="primary">
              Delete Account
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default DeleteAccount;
