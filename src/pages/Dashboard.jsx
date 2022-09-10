import { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Offcanvas,
  Navbar,
  Form,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));

  const onLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={6}></Col>
        <Col lg={3}></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
