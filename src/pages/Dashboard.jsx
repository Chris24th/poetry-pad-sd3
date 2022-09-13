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

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [poemData, setPoemData] = useState();
  const [showRM, setShowRM] = useState(false);
  const [clickedPoem, setClickedPoem] = useState();
  const [showDel, setShowDel] = useState(false);
  const [showEd, setShowEd] = useState(false);
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

  // const onAdd = () => {
  //   if (!title && !firstStanza) {
  //     setError("Please add your poem title and your first stanza.");
  //   } else if (!title) {
  //     setError("Please add your poem title.");
  //   } else if (!firstStanza) {
  //     setError("Please add your first stanza.");
  //     setStanza(0);
  //   } else {
  //     setStanza(stanza + 1);
  //     setError("");
  //   }
  // };
  //----------------------------------------

  const handleShowRM = (poem) => {
    setShowRM(true);
    setClickedPoem(poem);
  };
  const handleCloseRM = () => {
    setClickedPoem("");
    setShowRM(false);
  };

  const handleShowEd = (poem) => {
    setShowEd(true);
    setClickedPoem(poem);
    setTitle(poem.title);
    setFirstStanza(poem.firstStanza);
    setSecondStanza(poem.secondStanza);
    setThirdStanza(poem.thirdStanza);
    setFourthStanza(poem.fourthStanza);
    setPrivacy(poem.privacy);
    setIsDraft(poem.isDraft);
  };
  const handleCloseEd = () => {
    setClickedPoem("");
    setShowEd(false);
  };

  const onDelete = () => {};

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
                                      onClick={() => setShowDel(true)}
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
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="grow" size="lg" />
            </div>
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
          <Button variant="danger" onClick={() => setShowDel(false)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ------------------------------edit button----------------------------- */}
      {clickedPoem && (
        <Modal
          show={showEd}
          onHide={() => setShowEd(false)}
          style={{
            background: "none",
          }}
        >
          <Modal.Header closeButton className="in-title fs-4">
            Edit Published Poem
          </Modal.Header>
          <Modal.Body>
            <Row className="justify-content-center p-3">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Poem Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="First Stanza"
                    value={firstStanza}
                    onChange={(e) => setFirstStanza(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Second Stanza"
                    value={secondStanza}
                    onChange={(e) => setSecondStanza(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Third Stanza"
                    value={thirdStanza}
                    onChange={(e) => setThirdStanza(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Fourth Stanza"
                    value={fourthStanza}
                    onChange={(e) => setFourthStanza(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Text className="text-danger">
                  {error && (
                    <Alert variant="danger" style={{ textAlign: "center" }}>
                      {error}
                    </Alert>
                  )}
                </Form.Text>
              </Form>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEd(false)}>
              Back
            </Button>
            <Button variant="secondary" onClick={() => setShowEd(false)}>
              Save as Draft
            </Button>
            <Button variant="dark" onClick={() => setShowEd(false)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
