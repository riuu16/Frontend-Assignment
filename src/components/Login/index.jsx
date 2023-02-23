import { Fragment } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormCheck,
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

const formSchema = yup.object().shape({
  email: yup.string().email().required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "minimum 4 characters")
    .max(8, "maximum 8 characters"),
  rememberMe: yup.bool(),
});

const Login = () => {
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
    console.log("");
    try {
      await Userservices.login(
        values.email,
        values.password,
        values.rememberMe
      ).then((res) => {
        if (res.status === 200) {
          alert(`login successful`);
          navigate("/otp");
        }
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <Fragment>
      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto py-3 "
          style={{ width: "40rem" }}
        >
          <h2 className="mx-auto">Login</h2>
          <Form onSubmit={handleSubmit(onSubmit)} className="mx-5 px-3">
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Email Address</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter email"
                {...register("email")}
                required
              />
              <FormText className="text-danger">
                {errors.email?.message}
              </FormText>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicPassword">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter password"
                {...register("password")}
                required
              />
              <FormText className="text-danger">
                {errors.password?.message}
              </FormText>
            </FormGroup>
            <FormGroup className="mb-3" controlId="fromBasicCheckBox">
              <FormCheck
                type="checkbox"
                {...register("rememberMe")}
                label="Remember me 30 days "
              />
            </FormGroup>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Login;
