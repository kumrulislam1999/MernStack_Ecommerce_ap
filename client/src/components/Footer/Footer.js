import React from "react";

/* ===== Start Import Icon ===== */
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelopeOpen,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";

import { BiSolidPhoneCall } from "react-icons/bi";

/* ===== End Import Icon ===== */

/* ===== End Import Icon ===== */
import CartImg from "./../../images/payment_method.svg";
import FooterLogoImg from "./../../images/Logo_light.svg";

import { Container, Row, Col, NavLink } from "reactstrap";

const footer_link1 = [
  {
    path: "#",
    display: "My Account",
  },
  {
    path: "#",
    display: "View Cart",
  },
  {
    path: "#",
    display: "Wishlist",
  },
  {
    path: "#",
    display: "Compare",
  },
  {
    path: "#",
    display: "New Products",
  },
];

const footer_link2 = [
  {
    path: "#",
    display: "Help",
  },
  {
    path: "#",
    display: "Contact Us",
  },
  {
    path: "#",
    display: "Feedback",
  },
  {
    path: "#",
    display: "Customer Service",
  },
  {
    path: "#",
    display: "Store Location",
  },
];

export default function Footer() {
  return (
    // ======= footer Section Here ======= //
    <footer id="footer">
      <div className="footerTop">
        <Container>
          <Row className="rowBox">
            <Col lg="4">
              <ul className="socialIcon">
                <li>
                  <FaFacebookF />
                </li>
                <li>
                  <FaInstagram />
                </li>{" "}
                <li>
                  <FaXTwitter />
                </li>{" "}
                <li>
                  <FaLinkedinIn />
                </li>
              </ul>
            </Col>
            <Col lg="4">
              <div className="logoBox">
                <img src={FooterLogoImg} alt="footer logo png" />
              </div>
            </Col>
            <Col lg="4">
              <div className="cartBox">
                <img src={CartImg} alt="Payment Cart List Jpg" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footerMiddle">
        <Container>
          <Row className="rowBox">
            <Col lg="2">
              <h4>My Account</h4>
              <ul className="footerLink1">
                {footer_link1.map((item, index) => (
                  <li key={index}>
                    <span>
                      <FaAngleDoubleRight />
                    </span>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="2">
              <h4>Support</h4>
              <ul className="footerLink2">
                {footer_link2.map((item, index) => (
                  <li key={index}>
                    <span>
                      <FaAngleDoubleRight />
                    </span>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </Col>
            <Col lg="2">
              <h4>Opening Time</h4>
              <div className="sheduleBox">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <b>Mon-Tue: </b>
                      </th>
                      <td>
                        <span> 8AM - 10PM </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <b>Wed:</b>
                      </th>
                      <td>
                        <span>8AM - 8PM</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <b>Fri:</b>
                      </th>
                      <td>
                        <span>7AM - 12PM</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <b>Sat:</b>
                      </th>
                      <td>
                        <span>9AM - 8PM</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <b>Sun: </b>
                      </th>
                      <td>
                        <span>Closed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col lg="3">
              <h4>Contact Us</h4>
              <ul className="contactBox">
                <li>
                  <span className="icon">
                    <FaEnvelopeOpen />
                  </span>
                  <span>
                    kumrulislam1999@gmail.com
                    <br />
                  </span>
                </li>
                <li>
                  <span className="icon">
                    <BiSolidPhoneCall />
                  </span>
                  <span>
                    +8801518453737
                    <br />
                    +8801821142163
                  </span>
                </li>
                <li>
                  <span className="icon">
                    <FaLocationDot />
                  </span>
                  <span>
                    830 Broadway, New York,
                    <br /> NY 10003, United States
                  </span>
                </li>
              </ul>
            </Col>
            <Col lg="3">
              <h4>News Letter</h4>
              <p>
                Authoritatively morph 24/7 potentialities with error-free
                partnerships.
              </p>
              <form>
                <div className="formBox">
                  <input type="email" placeholder="Enter Your Email" />
                  <button type="submit">Subscribe</button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footerBottom">
        <div className="bottomBox">
          <p>&copy; 2022 All Rights Reserved Aytor By Angfuzsoft.</p>
        </div>
      </div>
    </footer>

    // ======= footer Section Here ======= //
  );
}
