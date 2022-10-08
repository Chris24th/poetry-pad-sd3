import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Alert,
} from "react-bootstrap";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://poetry-pad.herokuapp.com/api/forgotpassword", {
        email: email,
      })
      .then((res) => {
        localStorage.setItem("verify-email", JSON.stringify(res.data));
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setSuccess("Password reset link successfully sent to your email. ");
          setError("");
          // navigate("/signin");
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user-data")) {
      navigate("/dashboard");
    }
  });

  return (
    <Container className=" d-flex align-items-center justify-content-center">
      <div className="container-auth">
        <Row style={{ justifyContent: "space-around" }}>
          <h1 className="auth-title">Reset Password</h1>
          <Col md={7}>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="my-4">
                  We will send you a link to your email for password reset.
                </Form.Label>
                <br />
                <Form.Label>
                  {error && <Alert variant="danger">{error}</Alert>}
                </Form.Label>
                <Form.Label>
                  {success && (
                    <Alert variant="success">
                      {success}
                      <Link to="/signin" className="alert-link">
                        Log In
                      </Link>
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
                  {success ? (
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderLeft: "none" }}
                      disabled
                    />
                  ) : (
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ borderLeft: "none" }}
                      required
                    />
                  )}
                </InputGroup>
              </Form.Group>
              <div className="mt-5 auth-btn-cont">
                {success ? (
                  <Button
                    type="submit"
                    style={{
                      width: "150px",
                      backgroundColor: "#252527",
                      boxShadow: "0px 11px 20px rgba(0, 0, 0, 0.2)",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "20px",
                      height: "40px",
                    }}
                    disabled
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    style={{
                      width: "150px",
                      backgroundColor: "#252527",
                      boxShadow: "0px 11px 20px rgba(0, 0, 0, 0.2)",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "20px",
                      height: "40px",
                    }}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ForgotPassword;
