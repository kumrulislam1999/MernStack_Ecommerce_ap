import React from "react";
import Layout from "./../components/Layout/Layout";
import { Container, Row, Col } from "reactstrap";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

export default function Search() {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  return (
    <Layout title={"Search - Online Shop"}>
      <div id="searchResult">
        <Container>
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <Row>
            {values?.results.map((p) => (
              <Col lg="3" key={p._id}>
                <div className="card">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}....
                    </p>
                    <p className="card-text">${p.price}</p>
                    <button className="btn btn-primary ">More Details</button>
                    <button
                      className="btn btn-secondary "
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Item added Successfully");
                      }}
                    >
                      Add to Cart
                    </button>
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
