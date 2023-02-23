import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CompleteProfileOne from "./components/CompleteProfileOne";
import CompleteProfileTwo from "./components/CompleteProfileTwo";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Makepayment from "./components/Profile/Component/Makepayment";
import Register from "./components/Register";
import OtpVerified from "./EmailOtp/OtpVerified";
import PaymentOne from "./PaymentSuccess/PaymentOne";
import PaymentTwo from "./PaymentSuccess/PaymenTwo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/CompleteProfileOne" element={<CompleteProfileOne />} />
        <Route path="/CompleteProfileTwo" element={<CompleteProfileTwo />} />
        <Route path="/otp" element={<OtpVerified />} />
        <Route path="/Makepayment" element={<Makepayment />} />
        <Route path="/ThankYou-For-Payment" element={<PaymentTwo />} />
      </Routes>
    </Router>
  );
}

export default App;
