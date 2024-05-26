import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Layout from "../../components/Layout/Layout";
import { Container, Row, Col } from "reactstrap";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { Link } from "react-router-dom";

export default function Products() {
  // Use State
  const [products, setProducts] = useState([]);

  // Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );

      if (data?.success) {
        setProducts(data.products);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // UseEffect  LifeCycle Method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Products - Online Shop"}>
      <div id="products">
        <Container>
          <Row className="rowBox">
            <Col lg="3">
              <AdminMenu />
            </Col>
            <Col lg="9">
              <div className="contentBox">
                <div className="allProductBox">
                  <Row className="rowBox">
                    {products?.map((p) => (
                      <Col lg="4" key={p._id}>
                        <Link to={`/dashboard/admin/product/${p.slug}`}>
                          <div className="card">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              alt={p.name}
                            />
                            <div className="card-body">
                              <h5>{p.name}</h5>
                              <p>{p.description}</p>
                            </div>
                          </div>
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      ;
    </Layout>
  );
}
