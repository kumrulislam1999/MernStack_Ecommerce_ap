import React from "react";
import { Container, Row, Col } from "reactstrap";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu/UserMenu";
import { useAuth } from "../../context/auth";

export default function Dashboard() {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Online Shop"}>
      <div id="userDashboard">
        <Container>
          <Row className="rowBox">
            <Col lg="3">
              <UserMenu />
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
