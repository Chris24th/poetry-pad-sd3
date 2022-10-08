import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Container,
  InputGroup,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { MdOutlineEmail } from "react-icons/md";
import { BsArrowRight, BsVectorPen, BsPerson } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [name, setName] = useState();
  const [penName, setPenName] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password === confirmPassword) {
      if (password.length >= 6) {
        await axios
          .post("https://poetry-pad.herokuapp.com/api/signup", {
            name: name,
            penName: penName,
            email: email,
            password: password,
          })
          .then((res) => {
            setLoading(false);
            console.log(res.data);
            if (res.data.error) {
              return setError(res.data.error);
            } else {
              localStorage.setItem("verify-token", res.data);
              navigate("/signin");
              window.location.reload();
            }
          });
      } else {
        setLoading(false);
        return setError("Password must have 6 or more characters");
      }
    } else {
      setLoading(false);
      return setError("Passwords do not match.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user-data")) {
      navigate("/");
    }
  });

  return (
    <Container className=" d-flex align-items-center justify-content-center ">
      <div className="container-auth">
        <Form onSubmit={onRegister}>
          <Row className="my-3">
            <h1 className="auth-title">Sign Up</h1>
          </Row>
          <Row style={{ justifyContent: "space-between" }}>
            <br />
            <Form.Label>
              {error && (
                <Alert variant="danger" style={{ textAlign: "center" }}>
                  {error}
                </Alert>
              )}
            </Form.Label>
            {/* fullname------------------------------------------- */}
            <Col md={6}>
              <div>
                <Form.Group className="">
                  <Form.Label className="text-muted">Your Full Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        background: "#ffffff",
                        borderRight: "none",
                      }}
                    >
                      <BsPerson />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderLeft: "none" }}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              {/* penname-------------------------------------------*/}
              <div>
                <Form.Group className="">
                  <br />
                  <Form.Label className="text-muted">Your Pen Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      style={{
                        background: "#ffffff",
                        borderRight: "none",
                      }}
                    >
                      <BsVectorPen />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Pen Name"
                      onChange={(e) => setPenName(e.target.value)}
                      style={{ borderLeft: "none" }}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              {/* email-------------------------------------------*/}
              <div>
                <Form.Group className="mb-4" controlId="formBasicEmail">
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
                  <Form.Text>
                    We'll never share your email with anyone.
                  </Form.Text>
                </Form.Group>
              </div>
            </Col>
            {/* password------------------------------------------ */}
            <Col md={5}>
              <div>
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
              </div>
              {/* confirm pass----------------------------------------*/}
              <div>
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label className="text-muted">
                    Confirm Your Password
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text
                      style={{ background: "#ffffff", borderRight: "none" }}
                    >
                      <FiKey />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ borderLeft: "none" }}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </div>
              {/* sign up btn----------------------------------------*/}
              <div className="auth-btn-cont">
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
                  Sign Up
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
              </div>
              <div style={{ textAlign: "center" }}>
                <div>
                  Already Have Account?{" "}
                  <a
                    href="/signin"
                    style={{
                      textDecoration: "none",
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    Log In
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
