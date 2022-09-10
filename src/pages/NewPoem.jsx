import Sidebar from "../Sidebar";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const NewPoem = () => {
  const onAdd = () => {};
  return (
    <div>
      <Row>
        <Col lg={3}>
          <Sidebar />
        </Col>
        <Col lg={6}>
          <Row className="justify-content-center p-3">
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
            </Form>
            <button onClick={onAdd}> Add Stanza + </button>
          </Row>
        </Col>
        <Col lg={3}>
          <Row className="flex-column ">
            <Col style={{ textAlign: "end" }}>
              <Button variant="dark" className="np-col3">
                Publish
              </Button>
              <br />
              <Button variant="light" className="np-col3">
                Save as draft
              </Button>
              <br />
              <Button variant="light" className="np-col3">
                Cancel
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NewPoem;
