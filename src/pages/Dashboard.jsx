import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Spinner,
  Modal,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Alert,
  Placeholder,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { IconContext } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import { TbHeartPlus } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { Image } from "cloudinary-react";
import axios from "axios";
import EditPoem from "./EditPoem";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [poemData, setPoemData] = useState();
  const [showRM, setShowRM] = useState(false);
  const [clickedPoem, setClickedPoem] = useState();
  const [showDel, setShowDel] = useState(false);
  const [deleteId, setDeleteId] = useState();
  //----------------------------------------
  const [title, setTitle] = useState();
  const [firstStanza, setFirstStanza] = useState();
  const [secondStanza, setSecondStanza] = useState();
  const [thirdStanza, setThirdStanza] = useState();
  const [fourthStanza, setFourthStanza] = useState();

  const [error, setError] = useState("");
  const [privacy, setPrivacy] = useState();
  const [isDraft, setIsDraft] = useState();
  const [stanza, setStanza] = useState(0);

  const handleShowRM = (poem) => {
    setShowRM(true);
    setClickedPoem(poem);
  };
  const handleCloseRM = () => {
    setClickedPoem("");
    setShowRM(false);
  };

  const handleShowEd = (poem) => {
    localStorage.setItem("edit-poem", JSON.stringify(poem));
    navigate("/editpoem");
  };

  const onDelete = async () => {
    await axios
      .post("https://poetry-pad.herokuapp.com/api/deletepoem", { id: deleteId })
      .then(() => {
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
              {poemData.map(
                (poem) =>
                  poem.isDraft === 0 && (
                    <Container
                      key={poem.id}
                      className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5"
                    >
                      <IconContext.Provider value={{ color: "gray" }}>
                        <Row>
                          <div className="d-flex justify-content-between mb-3">
                            <span className="in-title fs-4">{poem.title}</span>
                            {poem.penName === user.penName && (
                              <span>
                                <Dropdown align="end">
                                  <Dropdown.Toggle
                                    className="btn"
                                    variant="Light"
                                    id="dropdown-menu-align-end"
                                    bsPrefix="p-0"
                                    size="lg"
                                  >
                                    <BsThreeDots size={25} />
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={() => handleShowEd(poem)}
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
                            )}
                          </div>
                        </Row>
                        <Row
                          className="mb-3 poem-p"
                          style={{ textAlign: "left" }}
                        >
                          <span>{poem.firstStanza}</span>
                        </Row>
                        <span
                          className="read-btn"
                          onClick={() => handleShowRM(poem)}
                        >
                          Read More
                        </span>
                        <Row className="mt-3 justify-content-between ">
                          <Col md={4}>
                            <Row>
                              <div className="d-flex align-items-center">
                                {user.url ? (
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="profile picture"
                                    cloudName="dabc77dwa"
                                    publicID={poem.url}
                                    className="border border-1 border-dark rounded-3 shadow-sm text-align-right"
                                  />
                                ) : (
                                  <MdAccountCircle
                                    size={40}
                                    className="border border-1 border-dark rounded-3 shadow-sm text-align-right"
                                  />
                                )}
                                <Col className="ms-4">
                                  <Row>{poem.penName}</Row>
                                  <Row className="text-muted">
                                    {poem.created_at
                                      .slice(0, 10)
                                      .replace(/-/g, "/")}
                                  </Row>
                                </Col>
                              </div>
                              <div></div>
                            </Row>
                          </Col>
                          <Col
                            md={3}
                            className="d-flex justify-content-end align-items-center"
                          >
                            <TbHeartPlus size={25} className="me-3" />
                            <BiCommentDetail size={25} />
                          </Col>
                        </Row>
                      </IconContext.Provider>
                    </Container>
                  )
              )}
            </>
          ) : (
            <>
              <Container className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5">
                <Placeholder as="p" animation="wave">
                  <Placeholder xs={6} /> <br />
                  <br />
                  <Placeholder xs={5} /> <Placeholder xs={4} />
                  <br />
                  <Placeholder xs={8} />
                  <br />
                  <Placeholder xs={4} /> <Placeholder xs={5} />
                  <br />
                  <br />
                  <Placeholder xs={3} size="xs" />
                  <br />
                  <Row className="justify-content-between">
                    <Col>
                      <Placeholder xs={2} size="lg" />{" "}
                      <Placeholder xs={3} size="lg" />
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Placeholder xs={2} size="lg" className="me-3" />
                      <Placeholder xs={2} size="lg" />
                    </Col>
                  </Row>
                </Placeholder>
              </Container>

              <Container className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5">
                <Placeholder as="p" animation="wave">
                  <Placeholder xs={5} /> <br />
                  <br />
                  <Placeholder xs={4} /> <Placeholder xs={4} />
                  <br />
                  <Placeholder xs={9} />
                  <br />
                  <Placeholder xs={3} /> <Placeholder xs={5} />
                  <br />
                  <br />
                  <Placeholder xs={3} size="xs" />
                  <br />
                  <Row className="justify-content-between">
                    <Col>
                      <Placeholder xs={2} size="lg" />{" "}
                      <Placeholder xs={3} size="lg" />
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Placeholder xs={2} size="lg" className="me-3" />
                      <Placeholder xs={2} size="lg" />
                    </Col>
                  </Row>
                </Placeholder>
              </Container>
            </>
          )}
        </Col>
        <Col lg={3}></Col>
      </Row>
      {/* -----------------------------modal----------------------------- */}
      {clickedPoem && (
        <Modal
          key={clickedPoem.id}
          show={showRM}
          onHide={handleCloseRM}
          style={{
            background: "none",
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <h5 className="in-title mb-3"> {clickedPoem.title}</h5>
            <p className="poem-p"> {clickedPoem.firstStanza}</p>
            <p className="poem-p"> {clickedPoem.secondStanza}</p>
            <p className="poem-p"> {clickedPoem.thirdStanza}</p>
            <p className="poem-p"> {clickedPoem.fourthStanza}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRM}>
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
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
