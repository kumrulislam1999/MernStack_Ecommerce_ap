import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Row, Col } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CategoryProduct() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  // Get Product Category-wise
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect Hooks
  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);
  return (
    <Layout title={"Category Product - Online Shop"}>
      <div>
        <Container>
          <h2 className="text-center">{category.name}</h2>
          <h5 className="text-center">{products?.length} result found</h5>
          <Row>
            {products?.map((p) => (
              <Col lg="4" key={p._id}>
                <div className="card">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="card-text">
                      {p.description.substring(0, 30)}....
                    </p>
                    <p className="card-text">${p.price}</p>
                    <div className="mt-3 d-flex justify-content-between ">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button className="btn btn-secondary ">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
