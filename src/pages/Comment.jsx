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
} from "react-bootstrap";
import { TbHeartPlus } from "react-icons/tb";
import { MdAccountCircle } from "react-icons/md";
import { Image } from "cloudinary-react";

const Comment = ({ selectedCom }) => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [comments, setComments] = useState();
  const [textContent, setTextContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [likesC, setLikesC] = useState();
  let ctr = 0;

  const displayComment = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaycomment")
      .then((res) => {
        res.data && setComments(res.data);
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

  const onLike = async (idComment) => {};

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {/* {likesC.map((likeC) => { */}
      <>Simple tooltip</>;{/* })} */}
    </Tooltip>
  );

  useEffect(() => {
    displayComment();
  });

  return (
    <Container className="mt-4">
      <Container>
        {comments ? (
          comments.map(
            (comm) =>
              comm[0].idPoem === selectedCom && (
                <Row className="mb-2">
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
                            {comm[0].created_at.slice(0, 10).replace(/-/g, "/")}
                          </Row>
                        </Col>
                      </div>
                    </Row>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <TbHeartPlus
                      role="button"
                      size={25}
                      color="#FF5A5F"
                      onClick={() => onLike(comm[0].id)}
                    />
                    <OverlayTrigger
                      placement="right"
                      delay={{ show: 150, hide: 300 }}
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          {/* {likesC.map(
                            (likeC) =>
                              likeC.idPoem === comm[0].id && (
                                <span
                                  key={likeC.id}
                                  style={{ background: "none" }}
                                >
                                  {likeC.name} - {likeC.penName} <br />
                                </span>
                              )
                          )} */}
                        </Tooltip>
                      }
                    >
                      <label className="likAndComLabel">
                        <script>{(ctr = 0)}</script>
                        {/* {likesC &&
                          likesC.map(
                            (likeC) =>
                              likeC.idPoem == comm[0].id && (
                                <script key={likeC.id}>{ctr++}</script>
                              )
                          )}
                        {ctr !== 0 && ctr} */}
                      </label>
                    </OverlayTrigger>
                  </Col>

                  <div className="border border-1 rounded-2 p-2 my-1 w-80">
                    {comm[0].textContent}
                  </div>
                </Row>
              )
          )
        ) : (
          <>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={3} /> <br />
              <Placeholder xs={3} />
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
  );
};

export default Comment;
