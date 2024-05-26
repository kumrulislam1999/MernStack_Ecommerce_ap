import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu/UserMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  /* ==== Start UseState Hooqs ==== */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  // useAuth Hooks
  const [auth, setAuth] = useAuth();

  // get User Data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  /* ==== Start Register Form Submit Handler ==== */
  const registerSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        let ls = localStorage.getItem("auth");

        ls = JSON.parse(ls);
        console.log(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  /* ==== End Register Form Submit Handler ==== */
  return (
    <Layout title={"Your Profile - Online Shop"}>
      <div id="profile">
        <Container>
          <Row className="rowBox">
            <Col lg="3">
              <UserMenu />
            </Col>
            <Col lg="9" className="g-0">
              <div className="contentBox">
                <div className="registerBox">
                  <h3>Update Profile</h3>

                  <form onSubmit={registerSubmitHandler}>
                    <div className="input_group">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        placeholder="Enter Your Name"
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
                        disabled
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
                      />
                    </div>
                    <button type="submit">Update</button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
