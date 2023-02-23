import api from "./api";
import apiFormData from "./apiFormData";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const login = async (email, password, rememberMe) => {
  return api
    .post("/api/user/login", {
      email,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        if (rememberMe) {
          cookies.set("user", JSON.stringify(response.data.user), {
            path: "/",
            maxAge: 2592000,
          });
        } else {
          cookies.set("user", JSON.stringify(response.data.user), {
            path: "/",
            maxAge: 24 * 3600,
          });
        }
      }
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};

const register = async (fullname, email, dob, location, password, stripeToken) => {
  return api
    .post("/api/user/", {
      fullname,
      email,
      dob,
      location,
      password,
      stripeToken
    })
    .then(async (response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};

const updateProfile = async (fullname, email, dob, location, _id) => {
  return api
    .patch(`/api/user/Update/${_id}/personal-details`, {
      fullname,
      email,
      dob,
      location,
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};

const changesPassword = async (id, oldPassword, newPassword) => {
  return api
    .patch(`/api/user/update/${id}/change-password`, {
      oldPassword,
      newPassword,
    })
    .then((response) => {
      if (response.status === 200) {
        cookies.remove("user");
        cookies.set("user", JSON.stringify(response.data.user), { path: "/" });
        console.log(cookies.get("user"));
      }
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response;
    });
};

const deleteAccount = async (_id, reason) => {
  return api
    .patch(`/api/user/Update/${_id}/delete-account`, {
      reason,
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};

const userMediaGenderUpload = async (id, profileImage, video, gender) => {

  // console.log(id, profileImage[0], video[0], gender)

  const formData = new FormData()

  formData.append('profileImage', profileImage[0])
  formData.append('video', video[0])
  formData.append('gender', gender)

  console.log(formData)
  for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + JSON.stringify(pair[1]));
  }

  for (const value of formData.values()) {
      console.log(value);
  }

  return await apiFormData.patch(`/api/user/media/${id}`, formData).then((response) => {
      console.log(response)
      if (response.status === 200) {
          return response
      }
      return response
  }).catch((error) => {
      console.log(error.response.data)
      return error.response
  })
}

const makePaymentUser = async (paymentMethodId, product, user_id) => {
  console.log(paymentMethodId, product, user_id)
  return api.post(`/api/payment/`, {
      paymentMethodId,
      product,
      user_id
  }).then((response) => {
      console.log(`Response : ${response}`)
      const { status } = response
      console.log(`Status : ${status}`)
      return response
  }).catch((error) => {
      console.log(`Error :`, error.response)
      return error.response
  })
}

const UpdatePaymentStatus = async (payment_id, user_id) => {
  console.log(payment_id, user_id)
  return api.post(`/api/payment/update/`, {
      payment_id,
      user_id
  }).then((response) => {
      console.log(`Response :`, response.data.user)
      const { status } = response
      console.log(`Status : ${status}`)
      if (status === 200) {
          cookies.set('user', JSON.stringify(response.data.user), { path: '/', maxAge: 24 * 3600 });
      }
      return response
  }).catch((error) => {
      console.log(`Error : ${error}`)
      return error.response
  })
}

const userBioOrLinks = async (id, Bio, linkedln, facebook) => {
  return api.patch(`/api/user/details/${id}`, {
      Bio,
      linkedln,
      facebook
  }).then((response) => {
      return response
  }).catch((error) => {
      return error.response
  })
}


    const Userservices = {
      register,
      login,
      changesPassword,
      updateProfile,
      deleteAccount,
      userMediaGenderUpload,
      makePaymentUser,
      UpdatePaymentStatus,
      userBioOrLinks
    };

    export default Userservices
