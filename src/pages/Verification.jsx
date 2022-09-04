import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Row, Col, Container } from "react-bootstrap";

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
          console.log(res.data);
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
  };
  return (
    <Container>
      <Row>
        <Col>Your Email is verified!</Col>
      </Row>
      <Row>
        <Button onClick={onLogin}>Log In</Button>
      </Row>
    </Container>
  );
};

export default Verification;
