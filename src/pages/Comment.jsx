import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Comment = () => {
  return (
    <Container className="mt-4">
      <Row className="inline-flex">
        <Form className="d-flex">
          <Form.Control
            type="text"
            placeholder="Type here to add comment"
            className="me-2"
            required
          />
          <Button type="submit" variant="dark" size="sm">
            Send
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default Comment;
