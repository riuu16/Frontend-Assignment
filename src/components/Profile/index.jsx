import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";

import ProfileDetails from "./Component/ProfileDetails";
import ChangePassword from "./Component/Changepassword";
import DeleteAccount from "./Component/DeleteAccount";
import MakePayment from "./Component/Makepayment";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Button, Container } from "react-bootstrap";

const Profile = () => {
  const [key, setKey] = useState("profiledetails");
  const navigate = useNavigate();

  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("user") === undefined) navigate("/login");
  });
  const user = cookies.get("user")
  const onClickHandler = (e) => {
    cookies.remove("user");
    navigate("/login");
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between mb-3">
        <span className="text-muted h2" style={{ fontWeight: `700` }}>
          Welcome {user? user.userDetails.fullname: ''}
        </span>
        <Button
          onClick={onClickHandler}
          variant="dark"
          style={{ letterSpacing: "2px", fontWeight: "600" }}
        >
          Logout
        </Button>
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="profiledetails" title="ProfileDetails">
          <ProfileDetails />
        </Tab>
        <Tab eventKey="changepassword" title="ChangePassword">
          <ChangePassword />
        </Tab>
        <Tab eventKey="deleteaccount" title="DeleteAccount">
          <DeleteAccount />
        </Tab>
        <Tab eventKey="makepayement" title="MakePayment">
          <MakePayment />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Profile;
