import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./../components/Layout/Layout";

import { Col, Container, Row } from "reactstrap";
import { useAuth } from "../context/auth";

import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";

export default function CartPage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Delete Product cart Item
  const removeCartItem = async (pid) => {
    try {
      const myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);

      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Get Payment Gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );

      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect hook for getToken
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // Handle Payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Card Page - Online Shop"}>
      <div id="cartPage">
        <Container>
          <h1 className="text-center bg-light p-2">
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>

          <h4 className="text-center">
            {cart?.length
              ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                }`
              : " Your Cart Is Empty"}
          </h4>
          <Row>
            <Col lg="8">
              {cart?.map((p) => (
                <Row key={p._id}>
                  <Col lg="4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </Col>
                  <Col lg="8">
                    <h6>{p.name}</h6>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>{p.price}</p>
                    <button
                      className="btn btn-danger bg-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col lg="4">
              <div className="text-center">
                <h3>Cart Summary</h3>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total : {totalPrice()}</h4>
                {auth?.user?.address ? (
                  <>
                    <div className="addressBox">
                      <h4>Current Addresss</h4>
                      <h5>{auth?.user?.address}</h5>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </div>
                  </>
                ) : (
                  <div>
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/login", { state: "/cart" })}
                      >
                        Please Login to checkou
                      </button>
                    )}
                  </div>
                )}

                <div>
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
