import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { GiFeather } from "react-icons/gi";

const About = () => {
  return (
    <Container fluid="md">
      <Row style={{ justifyContent: "space-between", marginBottom: "50px" }}>
        <Col xs={5}>
          <h1 className="about-hdr mb-4">About Us</h1>
          <p className="about-p mb-5">
            We are a startup web app with a goal to provide poem enthusiasts a
            place where they can read poetry pieces and at the same time create
            one for themselves.
          </p>
          <h1 className="about-hdr mb-4">Contact Us</h1>
          <div
            className="about-p"
            style={{ fontWeight: "100", fontSize: "17px" }}
          >
            <p>
              +63 927 987 6345
              <br />
              poetrypad@gmail.com
            </p>
            <p style={{ fontSize: "15px" }}>
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
        <Col xs={5}>
          <h1 className="about-hdr mb-4">Services</h1>
          <p className="about-p">
            <GiFeather size={30} style={{ marginRight: "10px" }} />
            read poems of fellow poets
          </p>
          <p className="about-p">
            <GiFeather size={30} style={{ marginRight: "10px" }} />
            write your own poems
          </p>
          <p className="about-p">
            <GiFeather size={30} style={{ marginRight: "10px" }} />
            like and comment on poems
          </p>
          <p className="about-p">
            <GiFeather size={30} style={{ marginRight: "10px" }} />
            thesaurus
          </p>
          <p className="about-p">
            <GiFeather size={30} style={{ marginRight: "10px" }} />
            find rhyming words
          </p>
          <p className="about-p">
            <GiFeather size={30} style={{ marginRight: "10px" }} />
            automatically check plagiarism
          </p>
        </Col>
      </Row>
      <Col xs={5}></Col>
    </Container>
  );
};

export default About;
