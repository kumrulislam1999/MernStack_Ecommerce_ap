import React from "react";
import { Container, Row, Col } from "reactstrap";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = useCategory();

  return (
    <Layout title={"Categories - Online Shop"}>
      <h1>All Categories</h1>
      <Container>
        <Row>
          {categories?.map((c) => (
            <Col lg="6" key={c._id}>
              <Link to={`/category/${ c.slug}`}>{c.name}</Link>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
