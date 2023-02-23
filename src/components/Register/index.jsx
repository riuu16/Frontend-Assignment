import { Fragment, useEffect } from "react";

import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Userservices from "../../services/user.services";
import { useNavigate } from "react-router-dom";
import { differenceInYears } from "date-fns";
import Cookies from "universal-cookie";

const formSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email address is required"),
  dob: yup
    .string()
    .required(`Date of birth is required`)
    .test("dob", "Should be greater than 18", function (value) {
      return differenceInYears(new Date(), new Date(value)) >= 18;
    }),
  location: yup.string().required("Location is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "minimum 4 characters")
    .max(8, "maximum 8 characters"),
  confirmpassword: yup
    .string()
    .required("Confirm Password")
    .min(4, "minimum 4 characters")
    .max(8, "maximum 8 characters")
    .oneOf([yup.ref("password")], "Password not match"),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values));
    try {
      await Userservices.register(
        values.fullname,
        values.email,
        values.dob,
        values.location,
        values.password
      ).then((res) => {
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/Login");
        }
        if (
          res.status === 400 ||
          res.status === 401 ||
          res.status === 503 ||
          res.status === 403
        ) {
          alert(res.data.Error[0].message);
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Container className="py-5">
      <Card
        className="border-0 shadow mx-auto py-3 "
        style={{ width: "40rem" }}
      >
        <h2 className="mx-auto">Register</h2>
        <Form onSubmit={handleSubmit(onSubmit)} className="mx-5 px-3">
          <FormGroup className="mb-3" controlId="formBasicName">
            <FormLabel>Full Name</FormLabel>
            <FormControl
              type="fullname"
              placeholder="Full Name"
              {...register("fullname")}
              required
            />
            <Form.Text className="text-danger">
              {errors.fullname?.message}
            </Form.Text>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicEmail">
            <FormLabel>Email address</FormLabel>
            <FormControl
              type="email"
              placeholder="Enter email"
              {...register("email")}
              required
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicDate">
            <FormLabel>DOB</FormLabel>
            <FormControl
              type="date"
              placeholder="Enter Date"
              {...register("dob")}
              required
            />
            <Form.Text className="text-danger">{errors.dob?.message}</Form.Text>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicLocation">
            <FormLabel>Location</FormLabel>
            <FormControl
              type="Location"
              placeholder="Enter Location"
              {...register("location")}
              required
            />
            <Form.Text className="text-danger">
              {errors.location?.message}
            </Form.Text>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicPassword">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Enter password"
              {...register("password")}
              required
            />
            <Form.Text className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </FormGroup>
          <FormGroup className="mb-3" controlId="formBasicCPassword">
            <FormLabel>Confirm password</FormLabel>
            <FormControl
              type="confirmpassword"
              placeholder="Enter Confirmed password"
              {...register("confirmpassword")} // change the name attribute here
              required
            />
            <Form.Text className="text-danger">
              {errors.confirmpassword?.message}
            </Form.Text>
          </FormGroup>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
