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
  Tooltip,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { IconContext } from "react-icons";
import { BsThreeDots } from "react-icons/bs";
import { RiHeartAddLine, RiHeartAddFill } from "react-icons/ri";
import { BiCommentDetail } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { Image } from "cloudinary-react";
import axios from "axios";
import Comment from "./Comment";
import MyPlaceHolder from "./MyPlaceHolder";
import EditPoem from "./EditPoem";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [poemData, setPoemData] = useState();
  const [showRM, setShowRM] = useState(false);
  const [clickedPoem, setClickedPoem] = useState();
  const [showDel, setShowDel] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedCom, setSelectedCom] = useState(false);
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

  const [likesP, setLikesP] = useState();
  let ctr = 0;
  const handleShowRM = (poem) => {
    setShowRM(true);
    setClickedPoem(poem);
  };
  const handleCloseRM = () => {
    setClickedPoem("");
    setShowRM(false);
  };

  const popover = (poem) => (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Profile</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {likesP.map((likeP) => {
        <>Simple tooltip</>;
      })}
    </Tooltip>
  );

  const onDelete = async () => {
    setLoading(true);
    await axios
      .post("https://poetry-pad.herokuapp.com/api/deletepoem", { id: deleteId })
      .then(() => {
        setLoading(false);
        window.location.reload();
      });
  };

  const onLike = async (idPoem) => {
    await axios.post("https://poetry-pad.herokuapp.com/api/createlikePoem", {
      idPoem: idPoem,
      penName: user.penName,
      name: user.name,
    });
    // .then((res) => {
    //   console.log(res.data);
    // });
  };

  const displayPoem = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaypoem")
      .then((res) => {
        res.data && setPoemData(res.data);
      });
  };

  const displayLikeP = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaylikePoem")
      .then((res) => {
        res.data && setLikesP(res.data);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    displayPoem();
    displayLikeP();
  });

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
                  poem.isDraft === 0 &&
                  poem.privacy === "public" && (
                    <Container
                      key={poem.id}
                      className="shadow-sm border border-1 rounded-3 mb-4 p-4 px-5"
                    >
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
                                  <BsThreeDots color="#767676" size={25} />
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
                        className="text-muted read-btn"
                        onClick={() => handleShowRM(poem)}
                      >
                        Read More
                      </span>
                      <Row className="mt-3 justify-content-between ">
                        <Col md={4}>
                          <Row>
                            <OverlayTrigger
                              trigger="click"
                              placement="right"
                              overlay={popover(poem)}
                            >
                              <div
                                className="d-flex align-items-center"
                                style={{ cursor: "pointer" }}
                              >
                                {poem.url ? (
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="profile picture"
                                    cloudName="dabc77dwa"
                                    publicID={poem.url}
                                    className="border border-2 border-gray rounded-3 shadow-sm text-align-right"
                                  />
                                ) : (
                                  <MdAccountCircle
                                    size={40}
                                    className="border border-2 border-gray rounded-3 shadow-sm text-align-right"
                                  />
                                )}
                                <Col className="ms-4">
                                  <Row>{poem.penName}</Row>
                                  <Row
                                    className="text-muted"
                                    style={{
                                      fontSize: "12px",
                                    }}
                                  >
                                    {poem.created_at
                                      .slice(0, 10)
                                      .replace(/-/g, "/")}
                                  </Row>
                                </Col>
                              </div>
                            </OverlayTrigger>
                            <div></div>
                          </Row>
                        </Col>
                        <Col
                          md={3}
                          className="d-flex justify-content-end align-items-center"
                        >
                          <RiHeartAddLine
                            role="button"
                            size={25}
                            color="#FF5A5F"
                            onClick={() => onLike(poem.id)}
                          />
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 150, hide: 300 }}
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                {/* Check out this avatar */}
                                {likesP.map(
                                  (likeP) =>
                                    likeP.idPoem === poem.id && (
                                      <span
                                        key={likeP.id}
                                        style={{ background: "none" }}
                                      >
                                        {likeP.name} - {likeP.penName} <br />
                                      </span>
                                    )
                                )}
                              </Tooltip>
                            }
                          >
                            <label className="likAndComLabel">
                              <script>{(ctr = 0)}</script>
                              {likesP &&
                                likesP.map(
                                  (likeP) =>
                                    likeP.idPoem == poem.id && (
                                      <script key={likeP.id}>{ctr++}</script>
                                    )
                                )}
                              {ctr !== 0 && ctr}
                            </label>
                          </OverlayTrigger>
                          <BiCommentDetail
                            role="button"
                            size={25}
                            color="#767676"
                            onClick={() => {
                              selectedCom === poem.id ? (
                                <>{setShowComment(false)};</>
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
                          <Comment selectedCom={selectedCom} />
                        </Row>
                      )}
                    </Container>
                  )
              )}
            </>
          ) : (
            <>
              <MyPlaceHolder />
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

export default Dashboard;
