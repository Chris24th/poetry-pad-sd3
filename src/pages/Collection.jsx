import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {
  Row,
  Col,
  Container,
  Spinner,
  Modal,
  Button,
  Nav,
} from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

const Collection = () => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [poemData, setPoemData] = useState();
  const [showRM, setShowRM] = useState(false);
  const [clickedPoem, setClickedPoem] = useState();
  const [active, setActive] = useState("public");
  const [privacy, setPrivacy] = useState("public");
  const [isDraft, setIsDraft] = useState(0);

  const handleShowRM = (poem) => {
    setShowRM(true);
    setClickedPoem(poem);
  };
  const handleCloseRM = () => {
    setShowRM(false);
  };

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
          <Button
            variant="dark"
            style={{
              background: active != "public" && "none",
              color: active != "public" && "black",
              border: "none",
            }}
            onClick={() => {
              setActive("public");
              setPrivacy("public");
              setIsDraft(0);
            }}
            className="m-2"
          >
            Public
          </Button>
          <Button
            variant="dark"
            style={{
              background: active != "private" && "none",
              color: active != "private" && "black",
              border: "none",
            }}
            onClick={() => {
              setActive("private");
              setPrivacy("private");
              setIsDraft(0);
            }}
            className="m-2"
          >
            Private
          </Button>
          <Button
            variant="dark"
            style={{
              background: active != "drafts" && "none",
              color: active != "drafts" && "black",
              border: "none",
            }}
            onClick={() => {
              setActive("drafts");
              setPrivacy("private");
              setIsDraft(1);
            }}
            className="m-2"
          >
            Drafts
          </Button>

          {poemData ? (
            <>
              {poemData.map(
                (poem) =>
                  poem.penName == user.penName &&
                  poem.privacy == privacy &&
                  poem.isDraft == isDraft && (
                    <Container
                      key={poem.id}
                      className="shadow-sm border border-1 rounded-3 mb-2 p-4 px-5"
                    >
                      <Row>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="in-title fs-4">{poem.title}</span>
                          <span>
                            <BsThreeDots size={25} />
                          </span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <span className="poem-p" style={{ textAlign: "left" }}>
                          {poem.firstStanza}
                        </span>
                      </Row>
                      <span
                        className="read-btn"
                        onClick={() => handleShowRM(poem)}
                      >
                        Vew
                      </span>
                      {poem.privacy == "public" && <Row>like and comment</Row>}
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

      {/* --------------------------------modal------------------------------- */}
      {/* {clickedPoem && (
        <ViewPoem clickedPoem={clickedPoem} showRM={showRM} showRM />
      )}
       */}
      {clickedPoem && (
        <Modal
          key={clickedPoem.id}
          show={showRM}
          onHide={() => {
            setShowRM(false);
          }}
          style={{
            background: "none",
            // background: "rgba(0,0,0,0.3)",
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h5 className="in-title mb-3"> {clickedPoem.title}</h5>
            <p className="poem-p">{clickedPoem.firstStanza}</p>
            <p className="poem-p"> {clickedPoem.secondStanza}</p>
            <p className="poem-p"> {clickedPoem.thirdStanza}</p>
            <p className="poem-p"> {clickedPoem.fourthStanza}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowRM(false);
              }}
            >
              Back
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Collection;
