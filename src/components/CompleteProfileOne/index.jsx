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
import * as Yup from "yup";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Userservices from "../../services/user.services";

async function getDuration(file) {
  const url = URL.createObjectURL(file);

  return new Promise((resolve) => {
    const audio = document.createElement("audio");
    audio.danger = true;
    const source = document.createElement("source");
    source.src = url; //--> blob URL
    audio.preload = "metadata";
    audio.appendChild(source);
    audio.onloadedmetadata = function () {
      resolve(audio.duration);
    };
  });
}
const duration_checking = async (values) => {
  try {
    let file = values;
    const duration = await getDuration(file);
    return duration;
  } catch (error) {
    return false;
  }
};

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/tiff"];

const formSchema = Yup.object().shape({
  profileImage: Yup.mixed()
    .test("required", "You need to provide a file", (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (file) return true;
      return false;
    })
    .test("fileSize", "The file is too large", async (file) => {
      //if u want to allow only certain file sizes
      try {
        return file && (await file[0].size) <= 2000000;
      } catch (error) {
        return false;
      }
    })
    .test("file_formate", "Image file has unsupported format.", (file) => {
      try {
        return file && SUPPORTED_FORMATS.includes(file[0].type);
      } catch (error) {
        return false;
      }
    }),
  userVideo: Yup.mixed()
    .test("required", "You need to provide a file", (file) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (file) return true;
      return false;
    })
    .test("video-type", "file Must be MP4 only", async (file) => {
      try {
        if (file) return (await file[0].type) === "video/mp4";
      } catch (error) {
        return false;
      }
    })
    .test("duration-check", "file duration 30 sec", async (file) => {
      if (file) return (await duration_checking(file[0])) <= 30;
      return false;
      // return file && await duration_checking(file[0]) <= 30
    }),
  gender: Yup.string()
    .min(1, "Should be select")
    .required("User must select any one")
    .nullable(),
});

const CompleteProfileOne = () => {
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

  useEffect(() => {
    if (cookies.get("user") === undefined) navigate("/login");
  });

  const onSubmit = async (values) => {
    if (user) {
      const userDetails_id = user.userDetails._id;
      console.log(`user Details Id: ${userDetails_id}`);

      try {
        const res = await Userservices.userMediaGenderUpload(
          userDetails_id,
          values.profileImage,
          values.userVideo,
          values.gender
        );
        if (res.status === 200) {
          alert(res.data.message);
          navigate("/CompleteProfileTwo");
        } else {
          alert(res.data.Error[0].message);
        }
      } catch (error) {
        console.log(error);
        alert("Error submitting form");
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
          <h2 className="mx-auto">Complete Profile step-1</h2>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="mx-5 px-3"
          >
            <FormGroup className="mb-3" controlId="formBasicImage">
              <FormLabel>Image</FormLabel>
              <FormControl
                type="file"
                {...register("profileImage")}
                accept="image/*"
                placeholder="Enter full name"
              />
              <FormText className="text-danger">
                {" "}
                {errors.profileImage?.message}
              </FormText>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicVideo">
              <FormLabel>Video</FormLabel>
              <FormControl
                type="file"
                accept="video/*"
                {...register("userVideo")}
                placeholder="Enter email"
              />
              <FormText className="text-danger">
                {" "}
                {errors.userVideo?.message}
              </FormText>
            </FormGroup>

            <FormGroup className="mb-3" controlId="formBasicDOB">
              <FormLabel className="me-3">Gender</FormLabel>
              <Form.Check
                inline
                label="male"
                name="group1"
                type={"radio"}
                id={`inline-checkbox-1`}
                {...register("gender")}
              />
              <Form.Check
                inline
                label="female"
                name="group1"
                type={"radio"}
                id={`inline-checkbox-2`}
                {...register("gender")}
              />
            </FormGroup>

            <Button variant="primary" type="submit">
              proceed
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default CompleteProfileOne;
