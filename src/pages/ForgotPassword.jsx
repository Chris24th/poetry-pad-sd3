import { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const [email, setEmail] = useState();

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
        }
      });
  };
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
                <Form.Label className="text-danger">
                  {error && error}
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
              <div className="mt-5 auth-btn-cont">
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
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ForgotPassword;
