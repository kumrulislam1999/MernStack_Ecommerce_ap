import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  // Initial P Details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product?.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Similar / Related product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details - Online Shop"}>
      <div id="productDetails">
        <Container>
          <div>
            <Row>
              <Col lg="5">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
                  alt={product.name}
                />
              </Col>
              <Col lg="7">
                <h2>Product Details</h2>
                <h6>Name: {product?.name}</h6>
                <h6>Description: {product?.description}</h6>
                <h6>Price: {product?.price}</h6>
                <h6>Category: {product?.category?.name}</h6>
                <h6>Shipping: {product?.shipping === true ? "Yes" : "No"}</h6>
                <button type="button" className="btn btn-secondary">
                  Add to Cart
                </button>
              </Col>
            </Row>
          </div>
          <div className="similarProduct">
            <Row>
              {relatedProduct.length < 1 && (
                <p className="text-center">No Similar Products Found</p>
              )}
              {relatedProduct?.map((p) => (
                <Col lg="4" key={p._id}>
                  <div className="card">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p>{p.description.substring(0, 30)}</p>
                      <p>{p.price}</p>
                      <button className="btn btn-secondar"> Add to Carr</button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </Layout>
  );
}
