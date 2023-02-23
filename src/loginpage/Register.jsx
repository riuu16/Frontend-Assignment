import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Register.css";

const Register = () => {
  const RegisterSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("Full name is required")
      .matches(/^[a-zA-Z ]*$/, "Please enter only alphabets for name"),
    emailaddress: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    dob: yup.string().required("DOB is required"),
    location: yup.string().required("Location is required"),
    password: yup
      .string()
      .required("Enter your password here")
      .min(8, "Password must be at least 8 characters long"),
    confirmpassword: yup
      .string()
      .required("Confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input {...register("fullName")} />
        {errors.fullName && <p>{errors.fullName.message}</p>}
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Email Address</label>
        <input {...register("emailaddress")} />
        {errors.emailaddress && <p>{errors.emailaddress.message}</p>}
      </div>
      <div>
        <label>DOB</label>
        <input type="date" {...register("dob")} />
        {errors.dob && <p>{errors.dob.message}</p>}
      </div>
      <div>
        <label>Location</label>
        <input {...register("location")} />
        {errors.location && <p>{errors.location.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" {...register("confirmpassword")} />
        {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
      </div>
      <input type="submit" className="submit" />
    </form>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Register />, rootElement);

export default Register;
