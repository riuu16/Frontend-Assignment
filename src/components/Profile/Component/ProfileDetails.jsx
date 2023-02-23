import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Container, Form, FormGroup } from "react-bootstrap";
import "react-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { differenceInYears } from "date-fns";

import Select from "react-select";

import { FormControl, FormLabel, FormText } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Userservices from "../../../services/user.services";

const formSchema = yup.object().shape({
  fullname: yup.string().required("Full name is required"),
  email: yup.string().email().required("Email address is required"),
  dob: yup
    .string()
    .required("Date of birth")
    .nullable()
    .test("dob", "Should be greater then 18", function (value) {
      return differenceInYears(new Date(), new Date(value)) >= 18;
    }),

  location: yup.string().required("Location is required"),
});

const ProfileDetails = () => {
  const navigate = useNavigate();

  const cookies = new Cookies();

  const user = cookies.get("user");
  // console.log(user);

  useEffect(() => {
    if (cookies.get("user") === undefined) {
      navigate("/login");
    }
  }, [cookies, navigate]);

  console.log(cookies.get("user"));

  const userDetailsValues = cookies.get("user");

  // console.log(userDetailsValues._id);

  const options = [
    { value: "India", label: "India" },
    { value: "United", label: "United" },
    { value: "Austrialia", label: "Austrialia" },
    { value: "Canada", label: "canada" },
    { value: "Germany", label: "Germany" },
  ];
  // <FormControl type="Location" placeholder="Enter Location" required>
  //   {({ field: { ref, ...rest } }) => (
  //     <Select
  //       options={options}
  //       defaultValue={options.find(
  //         (option) => option.value === userDetailsValues.userDetails.location
  //       )}
  //       onChange={(option) => rest.onChange(option.value)}
  //       inputRef={ref}
  //       {...rest}
  //     />
  //   )}
  // </FormControl>;
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
      await Userservices.updateProfile(
        values.fullname,
        values.email,
        values.dob,
        values.location,
        userDetailsValues._id
      ).then((res) => {
        if (res.status === 200) {
          alert(`update successful`);
          navigate("/");
        }
        console.log(res);
      });
    } catch (error) {
      console.log(error.response);
    }
    // const userDetailsValuesCookie = Cookies.get("userDetailsValues");
    // const userDetailsValues = JSON.parse(userDetailsValuesCookie);
    // console.log(userDetailsValues.userDetails.fullname);

    // const createdAtValuesCookie = Cookies.get("createdAtValues");
    // const createdAtValues = JSON.parse(createdAtValuesCookie);
    // console.log(createdAtValues.createdAt.email);
  };

  return (
    <Fragment>
      <Container className="py-5">
        <Card
          className="border-0 shadow mx-auto py-3"
          style={{ width: "40rem" }}
        >
          <h2 className="mx-auto">Profile details</h2>
          <Form onSubmit={handleSubmit(onSubmit)} className="mx-5 px-3">
            <FormGroup className="mb-3" controlId="formBasicName">
              <FormLabel>Full Name</FormLabel>
              <FormControl
                type="text"
                placeholder="Enter your full name"
                defaultValue={
                  userDetailsValues
                    ? userDetailsValues.userDetails.fullname
                    : ""
                }
                {...register("fullname")}
                required
              ></FormControl>

              <FormText className="text-danger">
                {errors.fullname?.message}
              </FormText>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasicEmail">
              <FormLabel>Email address</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter email"
                defaultValue={userDetailsValues ? userDetailsValues.email : ""}
                {...register("email")}
                required
              ></FormControl>
              <FormText className="text-danger">
                {errors.email?.message}
              </FormText>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasicDate">
              <FormLabel>DOB</FormLabel>
              <FormControl
                type="date"
                placeholder="Enter Date"
                {...register("dob")}
                required
              />
              <FormText className="text-danger">{errors.dob?.message}</FormText>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicLocation">
              <FormLabel>Location</FormLabel>
              <FormControl
                type="Location"
                placeholder="Enter Location"
                defaultValue={
                  userDetailsValues
                    ? userDetailsValues.userDetails.location
                    : ""
                }
                {...register("location")}
                required
              />
              <FormText className="text-danger">
                {errors.location?.message}
              </FormText>
            </FormGroup>

            <Button type="submit" bg="primary">
              Update
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default ProfileDetails;
