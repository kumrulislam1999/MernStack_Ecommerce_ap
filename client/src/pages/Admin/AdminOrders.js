import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/AdminMenu/AdminMenu";
import { useAuth } from "../../context/auth";

import { Select } from "antd";
const { Option } = Select;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [changeStatus, setChangeStatus] = useState("");
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Deleverd",
    "Cancel",
  ]);

  // Get All Orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect Hooks
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // Handle Change Order Status
  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Admin Orders - Online Shop"}>
      <div id="adminOrder">
        <Container>
          <Row>
            <Col lg="3">
              <AdminMenu />
            </Col>
            <Col lg="9">
              <div className="contentBox">
                <h2>All Orders</h2>

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
                            <td>
                              <Select
                                variant={false}
                                onChange={(value) =>
                                  handleChangeStatus(o._id, value)
                                }
                                defaultValue={o?.status}
                              >
                                {status.map((s, i) => (
                                  <Option key={i} value={s}>
                                    {s}
                                  </Option>
                                ))}
                              </Select>
                            </td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createAt).fromNow()}</td>
                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
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
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
