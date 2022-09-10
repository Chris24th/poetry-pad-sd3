import Sidebar from "../Sidebar";
import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const NewPoem = () => {
  return (
    <div>
      <Row>
        <Col md={4}>
          <Sidebar />
        </Col>
        <Col md={4}>
          <Row className="justify-content-center">
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
            </Form>
          </Row>
        </Col>
        <Col md={4}>
          <Row className="flex-column ">
            <Col style={{ textAlign: "end" }}>
              x<br />x<br />x
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NewPoem;
