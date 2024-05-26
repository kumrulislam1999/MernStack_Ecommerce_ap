import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Row, Col } from "reactstrap";
import toast from "react-hot-toast";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

export default function Home() {
  // Use State Hooks
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [radio, setRadio] = useState([]);
  const [checked, setChecked] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );

      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect for Loading Product
  useEffect(() => {
    if (page === 1) return;
    loadingMore();
  }, [page]);

  // Loading More Product
  const loadingMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect HOOKs
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // // useEffect Hooks
  // useEffect(() => {

  // }, []);
  // Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Filterd By Category
  const categoryFilterHandle = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Use Effect
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  // use Effect for Filtering
  useEffect(() => {
    if (checked || radio) FilterProduct();
  }, [checked, radio]);

  // Filtered Products
  const FilterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best Offer - Shop Now"}>
      <div id="home">
        <Container>
          <Row>
            <Col lg="2">
              <h6>Filter By Category</h6>
              <div className="filterByCategory my-4">
                {categories?.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => {
                      categoryFilterHandle(e.target.checked, c._id);
                    }}
                  >
                    {c.name}
                  </Checkbox>
                ))}
              </div>
              <div className="filterByPrice">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
              <div className="resetBox">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Reset Filter
                </button>
              </div>
            </Col>
            <Col lg="10">
              <div>
                <h2>All Product</h2>
                <div>
                  <Row>
                    {products?.map((p) => (
                      <Col md="4" key={p._id}>
                        <div className="card">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p.name}</h5>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>{p.price}</p>
                            <div className="d-flex justify-content-between">
                              <button
                                className="btn btn-primary"
                                onClick={() => navigate(`/product/${p.slug}`)}
                              >
                                See Details
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() => {
                                  setCart([...cart, p]);
                                  localStorage.setItem(
                                    "cart",
                                    JSON.stringify([...cart, p])
                                  );
                                  toast.success("Item Added To Cart");
                                }}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
                <div className="paginationBox">
                  {products && products.length < total && (
                    <button
                      className="btn btn-warning"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? "Loading....." : "Loadmore"}
                    </button>
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
