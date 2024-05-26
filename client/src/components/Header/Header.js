import React from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/auth";
import useCategory from "../../hooks/useCategory";
/* ===== Start Import Image Here ===== */
import Logo from "./../../images/Logo.png";

/* ===== End Import Image Here ===== */

/* ===== Start Icon Here ===== */
import { FaCartPlus, FaSearch, FaRegHeart } from "react-icons/fa";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLogoutCircleLine, RiRegisteredLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import SearchInput from "../Form/SearchInput";
import { useCart } from "../../context/cart";

/* ===== End Icon Here ===== */

/* ===== Header Nav Link ===== */
const Menu_link = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/blog",
    display: "Blog",
  },
  {
    path: "/shop",
    display: "Shop",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

export default function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory();
  /* ==== Start Handle Logout ==== */
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully", { duration: 4000 });
  };
  /* ==== End Handle Logout ==== */
  return (
    // ======= Start Header Section Here ======= //
    <header id="header">
      <div className="headerTop">
        <Container className="containerBox">
          <Row>
            <Col lg="4">
              <ul className="headerTopLeft">
                <li>
                  <NavLink to={""}>Support</NavLink>
                </li>
                <li>
                  <NavLink to={""}>Store Locator</NavLink>
                </li>
                <li>
                  <NavLink to={""}>Track Your Order</NavLink>
                </li>
              </ul>
            </Col>
            <Col lg="4">
              <ul className="headerTopCenter">
                <li>
                  <b>Call Us:</b>
                  <Link>
                    <span>(888) 1234 56789</span>
                  </Link>
                </li>
              </ul>
            </Col>
            <Col lg="4">
              <ul className="headerTopRight">
                <li>
                  <select>
                    <option value={"account"}>My Account</option>
                    <option value={"login"}>Login</option>
                    <option value={"wislist"}>Wistlist</option>
                    <option value={"Cart"}>My Cart</option>
                    <option value={"account"}>Account</option>
                  </select>
                </li>
                <li>
                  <select>
                    <option value={"doller"}>Doller</option>
                    <option value={"euro"}>Euro</option>
                  </select>
                </li>
                <li>
                  <select>
                    <option value={"bangla"}>Bangla</option>
                    <option value={"english"}>English</option>
                    <option value={"hindi"}>Hindi</option>
                    <option value={"turkish"}>Turkish</option>
                    <option value={"Japanise"}>Japanise</option>
                  </select>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="headerMiddle">
        <Container>
          <Row className="rowBox">
            <Col lg="2">
              {/* ==== Start Logo Here ==== */}
              <Link className="navbar-brand">
                <img className="logo" src={Logo} alt="Logo Jpg" />
              </Link>
              {/* ==== End Logo Here ==== */}
            </Col>

            <Col lg="6">
              <div className="search_box">
                <SearchInput />
              </div>
            </Col>

            <Col lg="3">
              {/* ==== Start Menu Icon Here ==== */}
              <ul id="right_menu">
                <li>
                  <NavLink to={""}>
                    <FaSearch className="icon" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/cart"}>
                    <FaCartPlus className="icon" />
                    <span className="cart_count">{cart?.length}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/wishlist"}>
                    <FaRegHeart className="icon" />
                  </NavLink>
                </li>

                {!auth.user ? (
                  <>
                    <li>
                      <NavLink to={"/login"}>
                        <AiOutlineLogin className="icon" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/register"}>
                        <RiRegisteredLine className="icon" />
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink to={"/login"} onClick={handleLogout}>
                        <RiLogoutCircleLine className="icon" />
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              {/* ==== End Menu Icon Here ==== */}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="headerBottom">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Container>
            <div>
              <div className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link to={"/categories"}>All Cateogies</Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c._id} className="dropdown-item">
                      <Link to={`/category/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarToggler">
              {/* ==== Start Menu Here ==== */}
              <ul className="navbar-nav" id="primary_menu">
                {Menu_link.map((item, index) => (
                  <li className="nav-item" key={index}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
              {/* ==== End Menu Here ==== */}

              <div className="accountHolder">
                <h4>
                  {auth?.user ? (
                    <>
                      <span> {auth?.user?.name}</span>
                      <div className="dropdown dashboard_icon">
                        <button
                          type="button"
                          className="dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <MdDashboard />
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to={`/dashboard/${
                                auth?.user?.role === 1 ? "admin" : "user"
                              }`}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to={""}>
                              Link 2
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to={""}>
                              Link 3
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <span>Please Login</span>
                    </>
                  )}
                </h4>
              </div>
            </div>
          </Container>
        </nav>
      </div>
    </header>
    // ======= End Header Section Here ======= //
  );
}
