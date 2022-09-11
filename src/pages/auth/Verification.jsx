import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Container, Alert } from "react-bootstrap";

const Verification = () => {
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const api = async () => {
    console.log(token);
    token &&
      (await axios
        .post("https://poetry-pad.herokuapp.com/api/verification", {
          token: token,
        })
        .then((res) => {
          localStorage.clear();
        }));
  };
  useEffect(() => {
    if (localStorage.getItem("user-data")) {
      navigate("/");
    }
    setToken(localStorage.getItem("verify-token"));
  }, [api()]);

  const onLogin = () => {
    navigate("/signin");
    window.location.reload();
  };

  return (
    <Container className=" d-flex align-items-center justify-content-center">
      <div className="container-auth mt-4">
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Alert variant="success">
              Congratulations! Your Email is verified.
            </Alert>
            <Button
              style={{
                width: "150px",
                backgroundColor: "#252527",
                boxShadow: "0px 11px 20px rgba(0, 0, 0, 0.2)",
                border: "none",
                borderRadius: "10px",
                fontSize: "20px",
                height: "40px",
                marginTop: "20px",
              }}
              onClick={onLogin}
            >
              Log In
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Verification;
