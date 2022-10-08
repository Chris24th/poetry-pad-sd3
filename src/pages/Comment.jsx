import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Placeholder,
  Spinner,
  OverlayTrigger,
  Tooltip,
  Dropdown,
} from "react-bootstrap";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Image } from "cloudinary-react";

const Comment = ({ selectedCom, comments }) => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [commento, setCommento] = useState();

  const [likesC, setLikesC] = useState();
  let ctrC = 0;

  const [edit, setEdit] = useState();
  const [clickedCom, setClickedCom] = useState();
  const [comTextContent, setComTextContent] = useState();

  const displaylikeC = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaylikeComment")
      .then((res) => {
        res.data && setLikesC(res.data);
      });
  };

  const displayComment = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaycomment")
      .then((res) => {
        res.data && setCommento(res.data);
        console.log(res.data);
      });
  };

  const onSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("https://poetry-pad.herokuapp.com/api/createcomment", {
        idPoem: selectedCom,
        idUser: user.id,
        textContent: textContent,
      })
      .then((res) => {
        console.log(res.data);
        setTextContent("");
        setLoading(false);
      });
  };

  const onDelete = async (idComment) => {
    setLoading(true);
    await axios
      .post("https://poetry-pad.herokuapp.com/api/deletecomment", {
        idComment: idComment,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
      });
  };

  const onEdit = async (com) => {
    setEdit(true);
    setClickedCom(com);
    setComTextContent(com.textContent);
  };

  const onSaveEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("https://poetry-pad.herokuapp.com/api/editcomment", {
        idComment: clickedCom.id,
        textContent: comTextContent,
      })
      .then((res) => {
        console.log(res.data);
        setClickedCom();
        setLoading(false);
      });
  };

  const onLike = async (idComment) => {
    await axios.post("https://poetry-pad.herokuapp.com/api/createlikeComment", {
      idComment: idComment,
      penName: user.penName,
      name: user.name,
    });
  };

  useEffect(() => {
    displaylikeC();
  });

  return (
    <>
      <Container className="mt-4 border-top">
        <Container>
          {comments ? (
            comments.map(
              (comm) =>
                comm[0].idPoem === selectedCom && (
                  <Row className="my-3" key={comm[0].id}>
                    <Col sm={9}>
                      <Row>
                        <div className="d-flex align-items-center">
                          {comm[1].url ? (
                            <Image
                              width={40}
                              height={40}
                              alt="profile picture"
                              cloudName="dabc77dwa"
                              publicID={comm[1].url}
                              className="border border-1 border-gray rounded-3 shadow-sm text-align-right"
                            />
                          ) : (
                            <MdAccountCircle
                              size={40}
                              className="border border-1 border-gray rounded-3 shadow-sm text-align-right"
                            />
                          )}
                          <Col className=" ms-4">
                            <Row>{comm[1].name}</Row>
                            <Row
                              className="text-muted"
                              style={{
                                fontSize: "12px",
                              }}
                            >
                              {comm[0].created_at
                                .slice(0, 10)
                                .replace(/-/g, "/")}
                            </Row>
                          </Col>
                        </div>
                      </Row>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                      <RiHeartLine
                        role="button"
                        size={20}
                        color="#FF5A5F"
                        onClick={() => onLike(comm[0].id)}
                      />
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 150, hide: 300 }}
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            {likesC &&
                              likesC.map(
                                (likeC) =>
                                  likeC.idComment === comm[0].id && (
                                    <span
                                      key={likeC.id}
                                      style={{ background: "none" }}
                                    >
                                      {likeC.name} - {likeC.penName} <br />
                                    </span>
                                  )
                              )}
                          </Tooltip>
                        }
                      >
                        <label className="likAndComLabel">
                          <script>{(ctrC = 0)}</script>
                          {likesC &&
                            likesC.map(
                              (likeC) =>
                                likeC.idComment == comm[0].id && (
                                  <script key={likeC.id}>{ctrC++}</script>
                                )
                            )}
                          {ctrC !== 0 && ctrC}
                        </label>
                      </OverlayTrigger>
                      {comm[1].penName === user.penName && (
                        <span>
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              className="btn"
                              variant="Light"
                              id="dropdown-menu-align-end"
                              bsPrefix="p-0"
                              size="lg"
                            >
                              <BsThreeDots color="#767676" size={18} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  onEdit(comm[0]);
                                }}
                              >
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  onDelete(comm[0].id);
                                }}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      )}
                    </Col>

                    <div className="border-bottom p-2 mt-1">
                      {clickedCom && clickedCom.id === comm[0].id ? (
                        <Form className="d-flex" onSubmit={onSaveEdit}>
                          <Form.Control
                            type="text"
                            placeholder="Edit your comment here"
                            className="me-2"
                            value={comTextContent}
                            onChange={(e) => setComTextContent(e.target.value)}
                            required
                          />
                          <Button
                            type="submit"
                            variant="dark"
                            size="sm"
                            disabled={loading ? true : false}
                          >
                            Edit
                          </Button>
                        </Form>
                      ) : (
                        <span className="comment-text">
                          {comm[0].textContent}
                        </span>
                      )}
                    </div>
                  </Row>
                )
            )
          ) : (
            <>
              <Placeholder as="p" animation="glow" className="mt-3">
                <Row className="mb-3">
                  <Col className="p-0 d-flex">
                    <Placeholder xs={2} size="lg" className="me-2" />
                    <Placeholder xs={5} />
                  </Col>
                  <Col className="d-flex justify-content-end">
                    <Placeholder xs={2} className="me-3" />
                    <Placeholder xs={2} />
                  </Col>
                </Row>
                <Row>
                  <Placeholder xs={11} className="mb-1" />
                  <Placeholder xs={9} />
                </Row>
              </Placeholder>
            </>
          )}
        </Container>

        <Row className="inline-flex my-2">
          <Form className="d-flex" onSubmit={onSend}>
            <Form.Control
              type="text"
              placeholder="Type here to add comment"
              className="me-2"
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="dark"
              size="sm"
              disabled={loading ? true : false}
            >
              Send
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
};

export default Comment;
