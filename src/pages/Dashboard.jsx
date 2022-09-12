import { useEffect, useState } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { IconContext } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [poemData, setPoemData] = useState();

  const api = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaypoem")
      .then((res) => {
        setPoemData(res.data);
      });
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    api();
  }, [api()]);

  return (
    <div>
      <Row>
        <Col lg={3} className="mb-4">
          <Sidebar />
        </Col>
        <Col lg={6}>
          {poemData ? (
            <>
              {poemData.map((poem) => (
                <Container className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5">
                  <IconContext.Provider value={{ color: "gray" }}>
                    <Row>
                      <div className="d-flex justify-content-between mb-3">
                        <span className="in-title fs-4">{poem.title}</span>
                        <span>
                          <BsThreeDots size={25} />
                        </span>
                      </div>
                    </Row>
                    <Row className="mb-3">
                      <span>{poem.firstStanza}</span>
                    </Row>
                    <span>Read More</span>
                    <Row className="mt-3 justify-content-between">
                      <Col md={3}>
                        <Row>
                          <Col sm={6}>photo</Col>
                          <Col sm={6}>{poem.penName}</Col>
                        </Row>
                      </Col>
                      <Col md={3} className="d-flex justify-content-end">
                        <TbHeartPlus size={25} className="me-3" />
                        <BiCommentDetail size={25} />
                      </Col>
                    </Row>
                  </IconContext.Provider>
                </Container>
              ))}
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="grow" size="lg" />
            </div>
          )}
        </Col>
        <Col lg={3}></Col>
      </Row>
    </div>
  );
};

export default Dashboard;
