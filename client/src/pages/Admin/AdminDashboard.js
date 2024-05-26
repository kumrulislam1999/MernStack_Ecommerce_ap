import React from "react";
import { Container, Row, Col } from "reactstrap";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import { useAuth } from "../../context/auth";

export default function AdminDashboard() {
  /* === Use Auth Hooks === */

  const [auth] = useAuth();

  return (
    <Layout title={"Admin Dashboard - Online shop"}>
      <div id="adminDashboard">
        <Container>
          <Row className="rowBox">
            <Col lg="3">
              <AdminMenu />
            </Col>
            <Col lg="9" className="g-0">
              <div className="contentBox">
                <div className="profileCart">
                  <ul>
                    <li>
                      <b>Admin Name</b> <span>{auth?.user?.name}</span>
                    </li>
                    <li>
                      <b>Admin Email</b> <span>{auth?.user?.email}</span>
                    </li>
                    <li>
                      <b>Admin Contact</b> <span>{auth?.user?.phone}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
}
