import React from "react";
import { Placeholder, Container, Row, Col } from "react-bootstrap";

const MyPlaceHolder = () => {
  return (
    <>
      <Container className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5">
        <Placeholder as="p" animation="glow">
          <Placeholder xs={6} /> <br />
          <br />
          <Placeholder xs={5} /> <Placeholder xs={4} />
          <br />
          <Placeholder xs={8} />
          <br />
          <Placeholder xs={4} /> <Placeholder xs={5} />
          <br />
          <br />
          <Placeholder xs={3} size="xs" />
          <br />
          <Row className="justify-content-between">
            <Col>
              <Placeholder xs={2} size="lg" /> <Placeholder xs={3} size="lg" />
            </Col>
            <Col className="d-flex justify-content-end">
              <Placeholder xs={2} size="lg" className="me-3" />
              <Placeholder xs={2} size="lg" />
            </Col>
          </Row>
        </Placeholder>
      </Container>
      <Container className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5">
        <Placeholder as="p" animation="glow">
          <Placeholder xs={5} /> <br />
          <br />
          <Placeholder xs={4} /> <Placeholder xs={4} />
          <br />
          <Placeholder xs={9} />
          <br />
          <Placeholder xs={3} /> <Placeholder xs={5} />
          <br />
          <br />
          <Placeholder xs={3} size="xs" />
          <br />
          <Row className="justify-content-between">
            <Col>
              <Placeholder xs={2} size="lg" /> <Placeholder xs={3} size="lg" />
            </Col>
            <Col className="d-flex justify-content-end">
              <Placeholder xs={2} size="lg" className="me-3" />
              <Placeholder xs={2} size="lg" />
            </Col>
          </Row>
        </Placeholder>
      </Container>
      <Container className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5">
        <Placeholder as="p" animation="glow">
          <Placeholder xs={3} /> <br />
          <br />
          <Placeholder xs={5} /> <Placeholder xs={4} />
          <br />
          <Placeholder xs={8} />
          <br />
          <Placeholder xs={4} /> <Placeholder xs={5} />
          <br />
          <br />
          <Placeholder xs={3} size="xs" />
          <br />
          <Row className="justify-content-between">
            <Col>
              <Placeholder xs={2} size="lg" /> <Placeholder xs={3} size="lg" />
            </Col>
            <Col className="d-flex justify-content-end">
              <Placeholder xs={2} size="lg" className="me-3" />
              <Placeholder xs={2} size="lg" />
            </Col>
          </Row>
        </Placeholder>
      </Container>
    </>
  );
};

export default MyPlaceHolder;
