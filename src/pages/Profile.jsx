import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Profile = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h1>Profile</h1>
          </Col>
        </Row>
        <Row>
          <Col className="col-sm-3">
            <Card>
              <Card.Body>Bio</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
