import { Fragment } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  FormText,
} from "react-bootstrap";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserServices from "../../../services/user.services";

const formSchema = Yup.object().shape({
  currentPWD: Yup.string()
    .required("this field must be requird")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  newPWD: Yup.string()
    .required("this field must be required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  confirmNewPWD: Yup.string()
    .required("this field must required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([Yup.ref("newPWD")], "Password do not match"),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(formSchema) });

  const cookies = new Cookies();

  const user = cookies.get("user");
  // console.log(user);

  useEffect(() => {
    if (cookies.get("user") === undefined) navigate("/login");
  });

  const [loader, setLoader] = useState(false);

  const onSubmit = async (values) => {
    setLoader(false);

    if (user) {
      const user_id = user._id;
      console.log(`user Details Id: ${user_id}`);

      try {
        await UserServices.changesPassword(
          user_id,
          values.currentPWD,
          values.newPWD
        ).then((res) => {
          if (res.status === 200) {
            alert(res.data.message);
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
        console.log(error.message);
      }
      setLoader(true);
    }
  };

  return (
    <Fragment>
      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto py-3"
          style={{ width: "40rem" }}
        >
          <h2 className="mx-auto">Change Password</h2>
          <Form className="mx-5 px-3" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup controlId="formFullName">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="text"
                {...register("currentPWD")}
                required
                placeholder="Enter your password"
              />
              <FormText className="text-danger">
                {errors.currentPWD?.message}
              </FormText>
            </FormGroup>

            <FormGroup controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="text"
                {...register("newPWD")}
                required
                placeholder="Enter your new password"
              />
              <FormText className="text-danger">
                {errors.newPWD?.message}
              </FormText>
            </FormGroup>

            <FormGroup controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="text"
                {...register("confirmNewPWD")}
                required
                placeholder="Enter your Confirmed Password"
              />
              <FormText className="text-danger">
                {errors.confirmNewPWD?.message}
              </FormText>
            </FormGroup>

            <Button
              type="submit"
              bg="primary"
              disabled={loader ? !loader : loader}
            >
              Update
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ChangePassword;
