import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  InputGroup,
  Row,
  Col,
  Figure,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import axios from "axios";
import LoginFrame from "../../images/loginframe.svg";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("https://poetry-pad.herokuapp.com/api/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          setError(res.data.error);
        } else {
          localStorage.setItem("user-data", JSON.stringify(res.data));
          navigate("/dashboard");
          window.location.reload();
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user-data")) {
      navigate("/");
    }
  });

  return (
    <Container className=" d-flex align-items-center justify-content-center">
      <div className="container-auth">
        <Row style={{ justifyContent: "space-around" }}>
          <Col
            md={5}
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: "20px",
            }}
          >
            <Figure>
              <Figure.Image width={300} alt="loginframe" src={LoginFrame} />
            </Figure>
          </Col>
          <Col md={6}>
            <Form onSubmit={onLogin}>
              <h1 className="auth-title">Log In</h1>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <br />
                <Form.Label>
                  {error && (
                    <Alert variant="danger" style={{ textAlign: "center" }}>
                      {error}
                    </Alert>
                  )}
                </Form.Label>
                <br />
                <Form.Label className="text-muted">Your Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text
                    style={{
                      background: "#ffffff",
                      borderRight: "none",
                    }}
                  >
                    <MdOutlineEmail />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderLeft: "none" }}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="text-muted">Your Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text
                    style={{ background: "#ffffff", borderRight: "none" }}
                  >
                    <FiKey />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderLeft: "none" }}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Row>
                <Link
                  to="/forgotpassword"
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    textAlign: "right",
                  }}
                >
                  Forgot Password?
                </Link>
              </Row>
              <Row className="mt-4 auth-btn-cont">
                <Button
                  type="submit"
                  style={{
                    width: "250px",
                    backgroundColor: "#252527",
                    boxShadow: "0px 11px 20px rgba(0, 0, 0, 0.3)",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "24px",
                    height: "55px",
                  }}
                  disabled={loading ? true : false}
                >
                  Log In
                  {loading ? (
                    <Spinner
                      className="ms-3"
                      animation="border"
                      variant="light"
                      size="sm"
                      style={{ background: "none", marginBottom: "2px" }}
                    />
                  ) : (
                    <BsArrowRight className="auth-arrow" />
                  )}
                </Button>
              </Row>
              <Row className="mb-4" style={{ textAlign: "center" }}>
                <div>
                  Don't Have Account?{" "}
                  <a
                    href="/signup"
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up Now
                  </a>
                </div>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default SignIn;
