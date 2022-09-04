import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Container fluid="md">
      <Row style={{ justifyContent: "space-between", marginBottom: "50px" }}>
        <Col xs={5}>
          <h1 className="about-hdr mb-4">About Us</h1>
          <p className="about-p">
            We are a startup web app with a goal to provide poem enthusiasts a
            place where they can read poetry pieces and at the same time create
            one for themselves.
          </p>
        </Col>
        <Col xs={5}>
          <h1 className="about-hdr">Services</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={5}>
          <h1 className="about-hdr mb-4">Contact Us</h1>
          <div className="about-p">
            <p>+1-415-555-0173</p>
            <p>poetrypad@gmail.com</p>
            <p>
              Cebu Institute of Technology-University, Cebu City, Cebu,
              Philippines
            </p>
            <a
              href="https://facebook.com/Chris24th"
              className="about-icons m-1"
            >
              <FaFacebook size={35} />
            </a>
            <a
              href="https://instagram.com/Chris24th"
              className="about-icons m-1"
            >
              <AiFillInstagram size={40} />
            </a>
            <a
              href="https://facebook.com/Chris24th"
              className="about-icons m-1"
            >
              <AiFillTwitterCircle size={40} />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
