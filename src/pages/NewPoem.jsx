import Sidebar from "../Sidebar";
import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const NewPoem = () => {
  const onAdd = () => {};
  return (
    <div>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={6}>
          <Row className="justify-content-center">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Poem Title</Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  placeholder="Poem Title"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="1st Stanza"
                ></Form.Control>
              </Form.Group>
              <button onClick={onAdd}> Add Stanza + </button>
            </Form>
          </Row>
        </Col>
        <Col md={3}>
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
