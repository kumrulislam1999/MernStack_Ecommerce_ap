import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from "reactstrap";

import axios from "axios";
/* ===== Start Imported Toastify ===== */
import toast from "react-hot-toast";
/* ===== End Imported Toastify ===== */

export default function Register() {
  /* ==== Start UseState Hooqs ==== */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  /* ==== End UseState Hooqs ==== */

  /* ==== Start Register Form Submit Handler ==== */
  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res && res.data.success) {
        toast.success(res.data.message, { duration: 4000 });
        navigate("/login");
      } else {
        toast.error(res.data.message, { duration: 4000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  /* ==== End Register Form Submit Handler ==== */

  return (
    <Layout title={"Register - Shop Now"}>
      <div id="register">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col lg="6">
              <div className="registerBox">
                <h3>Register Form</h3>

                <form onSubmit={registerSubmitHandler}>
                  <div className="input_group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      placeholder="Enter Your Name"
                      required
                    />
                  </div>

                  <div className="input_group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div className="input_group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                  <div className="input_group">
                    <label htmlFor="phone">Phone: </label>
                    <input
                      type="number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      id="phone"
                      placeholder="Enter Your Number"
                      required
                    />
                  </div>
                  <div className="input_group">
                    <label htmlFor="address">Address: </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                      placeholder="Enter Your  Address"
                      required
                    />
                  </div>
                  <div className="input_group">
                    <label htmlFor="answer">Answer:</label>
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      id="answer"
                      placeholder="What is your Favorite Sports?"
                      required
                    />
                  </div>
                  <button type="submit">Register</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
