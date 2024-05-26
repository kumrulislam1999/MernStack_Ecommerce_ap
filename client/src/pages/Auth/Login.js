import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from "reactstrap";
import { useAuth } from "../../context/auth";

import axios from "axios";
/* ===== Start Imported Toastify ===== */
import toast from "react-hot-toast";

/* ===== End Imported Toastify ===== */

export default function Login() {
  /* ==== Start UseState Hooqs ==== */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* === Use Context Api === */
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  /* ==== End UseState Hooqs ==== */

  /* ==== Start Register Form Submit Handler ==== */
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message, { duration: 4000 });
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
    <Layout title={"Login - Shop Now"}>
      <div id="login">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col lg="6">
              <div className="registerBox">
                <h3>Login Form</h3>

                <form onSubmit={loginSubmitHandler}>
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
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                  <div className="btnBox">
                    <button type="submit">Login</button>
                    <button
                      type="submit"
                      onClick={() => {
                        navigate("/forgot-password");
                      }}
                    >
                      Forgot Password
                    </button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
