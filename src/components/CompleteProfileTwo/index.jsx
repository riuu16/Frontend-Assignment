import { Fragment } from "react";
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
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import UserServices from "../../services/user.services";
import { useNavigate } from "react-router-dom";

function isValidUrl(string) {
  console.log(string);
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

const formSchema = Yup.object().shape({
  Bio: Yup.string()
    .min(4, "Bio should be at least 4 characters")
    .max(2000, "Total charter less then 200"),
  linkedln: Yup.string().url()
    .min(4, "Linkedln url should be at least 4 characters")
    .max(200, "Linkedln url shouldn't more then 200 characters")
    .test("linkedln", "Should be Linkedln origin link", function (value) {
      console.log(isValidUrl(value));
      if (isValidUrl(value)) {
        // console.log(value)
        // return new URL(value).hostname === 'www.linkedin.com'
        return new URL(value);
      }
    }),
  facebook: Yup.string().url()
    .min(4, "facebook url should be at least 4 characters")
    .max(200, "facebook url shouldn't more then 200 characters")
    .test("facebook", "Should be Facebook origin link", function (value) {
      if (isValidUrl(value)) {
        // return new URL(value).hostname === 'www.facebook.com'
        return new URL(value);
      }
    }),
});

const makeLinkedlnURL = (value) => {
  const parts = value.split("/");
  var last_value = parts.filter(Boolean).slice(-2);
  // https://www.linkedin.com/in/swapnil-bendal/
  let Linkedln_url = `https://www.linkedin.com/${last_value[0]}/${last_value[1]}/`;

  console.log(Linkedln_url);
  return Linkedln_url;
};

const makeFacebookURL = (value) => {
  const parts = value.split("?");
  var last_value = parts.filter(Boolean).slice(-1)[0];
  // https://www.facebook.com/profile.php?id=100012556984462
  let Facebook_URL = `https://www.facebook.com/profile.php?${last_value}`;

  console.log(Facebook_URL);
  return Facebook_URL;
};

const CompleteProfileTwo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const cookies = new Cookies();
  const navigate = useNavigate();

  const user = cookies.get("user");
  // console.log(user)

  useEffect(() => {
    if (cookies.get("user") === undefined) navigate("/login");
  });

  // const userDetails_id = user.userDetails._id
  // console.log(`user Details Id: ${userDetails_id}`)

  const onSubmitHandler = async (values) => {
    console.log(JSON.stringify(values, null, 3));
    console.log(user);
    const linkedinURL = makeLinkedlnURL(values.linkedln);
    const facebookURL = makeFacebookURL(values.facebook);
    console.log(facebookURL, linkedinURL);

    if (user) {
      const userDetails_id = user.userDetails._id;
      console.log(`user Details Id: ${userDetails_id}`);

      try {
        await UserServices.userBioOrLinks(
          userDetails_id,
          values.Bio,
          linkedinURL,
          facebookURL
        ).then((res) => {
          if (res.status === 200) {
            alert(res.data.message);
            console.log(res);
            setTimeout(() => {
              navigate("/");
            }, 1000);
            // navigate('/otp')
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
    }
  };

  return (
    <Fragment>
      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto py-3 "
          style={{ width: "40rem" }}
        >
          <h2 className="mx-auto">Complete Profile step-2</h2>
          <Form onSubmit={handleSubmit(onSubmitHandler)} className="mx-5 px-3">
            <FormGroup className="mb-3" controlId="formBasicBio">
              <FormLabel>Bio</FormLabel>
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Enter your Bio"
                {...register("Bio")}
              />
              <FormText className="text-danger">
                {" "}
                {errors.Bio?.message}
              </FormText>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formbasicURL">
              <FormLabel>LinkedIn URL</FormLabel>
              <FormControl
                type="text"
                {...register("linkedln", {})}
                placeholder="www.text.com"
              />
              <FormText className="text-danger">
                {errors.linkedln?.message}
              </FormText>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicFaceBook">
              <FormLabel className="me-3">Facebook URL</FormLabel>
              <FormControl
                type="text"
                {...register("facebook")}
                placeholder="www.text.com"
              />
              <FormText className="text-danger">
                {errors.facebook?.message}
              </FormText>
            </FormGroup>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default CompleteProfileTwo;
