import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgotPassword() {
  /* ==== Start UseState Hooqs ==== */
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /* === Use Context Api === */

  const navigate = useNavigate();

  /* ==== Reset Password Submit Handler ==== */
  const resetPasswordSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout title={"Forgot Password - Online Shop"}>
      <div id="forgotPassword">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col lg="6">
              <div className="registerBox">
                <h3>Login Form</h3>

                <form onSubmit={resetPasswordSubmitHandler}>
                  <div className="input_group">
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      id="newPassword"
                      placeholder="Enter Your New Password"
                      required
                    />
                  </div>
                  <div className="input_group">
                    <label htmlFor="answer">Answer</label>
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      id="answer"
                      placeholder="Enter Your Favorite Sports"
                      required
                    />
                  </div>

                  <button type="submit">Reset</button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
