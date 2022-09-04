import { useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    console.log(user);
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <p>Logged In as: {user?.email}</p>
        </Row>
        <Row>
          Home
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
