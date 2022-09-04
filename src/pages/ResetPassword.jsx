import { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { FiKey } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("verify-email"));

  const onReset = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      if (password.length >= 6) {
        let email = user;
        await axios
          .post("https://poetry-pad.herokuapp.com/api/resetpassword", {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(res.data);
            localStorage.clear();
          });
      } else {
        setError("Password must have 6 or more characters");
      }
    } else {
      setError("Passwords do not match.");
    }
  };

  return (
    <Container className=" d-flex align-items-center justify-content-center">
      <div className="container-auth">
        <Row style={{ justifyContent: "space-around" }}>
          <h1 className="auth-title">Reset Password</h1>
          <Col md={5}>
            <Form onSubmit={onReset}>
              <Form.Group controlId="formBasicEmail" className="mb-2 mt-4">
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
                    value={user}
                    style={{ borderLeft: "none" }}
                    disabled
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mb-2">
                <Form.Label className="text-muted">New Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text
                    style={{
                      background: "#ffffff",
                      borderRight: "none",
                    }}
                  >
                    <FiKey />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ borderLeft: "none" }}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="text-muted">
                  Confirm New Password
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text
                    style={{
                      background: "#ffffff",
                      borderRight: "none",
                    }}
                  >
                    <FiKey />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ borderLeft: "none" }}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Label className="text-danger">{error && error}</Form.Label>
              <div className="mt-4 auth-btn-cont">
                <Button
                  type="submit"
                  style={{
                    width: "200px",
                    backgroundColor: "#252527",
                    boxShadow: "0px 11px 20px rgba(0, 0, 0, 0.2)",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "18px",
                    height: "40px",
                  }}
                >
                  Reset Password
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ResetPassword;
