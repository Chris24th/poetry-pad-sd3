import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {
  Row,
  Col,
  Container,
  Placeholder,
  Modal,
  Button,
  Nav,
  Dropdown,
  Spinner,
} from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import { IconContext } from "react-icons";
import { BiCommentDetail } from "react-icons/bi";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Comment from "./Comment";
import MyPlaceHolder from "./MyPlaceHolder";
import axios from "axios";

const Collection = () => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [poemData, setPoemData] = useState();
  const [showRM, setShowRM] = useState(false);
  const [clickedPoem, setClickedPoem] = useState();
  const [active, setActive] = useState("public");
  const [privacy, setPrivacy] = useState("public");
  const [isDraft, setIsDraft] = useState(0);
  const [showDel, setShowDel] = useState();
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedCom, setSelectedCom] = useState(false);

  const handleShowRM = (poem) => {
    setShowRM(true);
    setClickedPoem(poem);
  };
  const handleCloseRM = () => {
    setShowRM(false);
  };

  const onDelete = async () => {
    setLoading(true);
    await axios
      .post("https://poetry-pad.herokuapp.com/api/deletepoem", { id: deleteId })
      .then(() => {
        setLoading(false);
        window.location.reload();
      });
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
                            <Dropdown align="end">
                              <Dropdown.Toggle
                                className="btn"
                                variant="Light"
                                id="dropdown-menu-align-end"
                                bsPrefix="p-0"
                                size="lg"
                              >
                                <BsThreeDots size={25} color="#767676" />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    localStorage.setItem(
                                      "edit-poem",
                                      JSON.stringify(poem)
                                    );
                                  }}
                                  href="/editpoem"
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setShowDel(true);
                                    setDeleteId(poem.id);
                                  }}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <span className="poem-p" style={{ textAlign: "left" }}>
                          {poem.firstStanza}
                        </span>
                      </Row>
                      <span
                        className="text-muted read-btn "
                        onClick={() => handleShowRM(poem)}
                      >
                        Read More
                      </span>
                      <Row className="justify-content-end">
                        <Col
                          md={3}
                          className="d-flex justify-content-end align-items-center"
                        >
                          <TbHeartPlus
                            role="button"
                            size={25}
                            color="#FF5A5F"
                            className="me-3"
                          />
                          <BiCommentDetail
                            role="button"
                            size={25}
                            color="#767676"
                            onClick={() => {
                              selectedCom === poem.id ? (
                                <>
                                  {setShowComment(false)};{setSelectedCom("")};
                                </>
                              ) : (
                                <>
                                  {setShowComment(true)};
                                  {setSelectedCom(poem.id)};
                                </>
                              );
                            }}
                          />
                        </Col>
                      </Row>
                      {selectedCom === poem.id && showComment && (
                        <Row>
                          <Comment />
                        </Row>
                      )}
                    </Container>
                  )
              )}
            </>
          ) : (
            <MyPlaceHolder />
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
      {/* ------------------------------delete button----------------------------- */}

      <Modal
        show={showDel}
        onHide={() => setShowDel(false)}
        style={{
          background: "none",
        }}
      >
        <Modal.Header closeButton className="in-title fs-4">
          Confirm Delete
        </Modal.Header>
        <Modal.Body>
          Are you sure? Your poem data will be lost forever.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDel(false)}>
            Back
          </Button>
          <Button
            variant="danger"
            onClick={onDelete}
            disabled={loading ? true : false}
          >
            {loading && (
              <Spinner
                className="me-1"
                animation="border"
                variant="light"
                size="sm"
                style={{ background: "none" }}
              />
            )}
            {loading ? "Deleting" : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Collection;
