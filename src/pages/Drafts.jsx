import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";

const Drafts = () => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [poemData, setPoemData] = useState();

  const api = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaypoem")
      .then((res) => {
        setPoemData(res.data);
      });
  };
  useEffect(() => {
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
              {poemData.map(
                (poem) =>
                  poem.penName === user.penName &&
                  poem.isDraft === true && (
                    <Container className="shadow-sm border border-1 rounded-3 mb-2 p-4 px-5">
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
                      <span>Vew</span>
                    </Container>
                  )
              )}
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

export default Drafts;
