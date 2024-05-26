import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";

export default function Orders() {
  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders - Online Shop"}>
      <div id="orders">
        <Container>
          <Row className="rowBox">
            <Col lg="3">
              <UserMenu />
            </Col>
            <Col lg="9" className="g-0">
              <div className="contentBox">
                <div className="profileCart">
                  <h1>All Orders</h1>
                  {orders.map((o, i) => {
                    return (
                      <div className="border shadow" key={i}>
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Status</th>
                              <th scope="col">Buyer</th>
                              <th scope="col">Orders</th>
                              <th scope="col">Payment</th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{i + 1}</td>
                              <td>{o?.status}</td>
                              <td>{o?.buyer?.name}</td>
                              <td>{moment(o?.createAt).fromNow()}</td>
                              <td>
                                {o?.payment.success ? "Success" : "Failed"}
                              </td>
                              <td>{o?.products?.length}</td>
                            </tr>
                          </tbody>
                        </table>

                        {o?.products?.map((p) => (
                          <div className="card m-2 shadow-sm p-2" key={p._id}>
                            <Row>
                              <Col md="4">
                                <img
                                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                  alt={p.name}
                                />
                              </Col>
                              <Col md="8">
                                <h6>{p.name}</h6>
                                <p>{p.description}</p>
                                <p>Price : {p.price}</p>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
