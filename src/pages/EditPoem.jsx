import { useState, useEffect } from "react";
import { Row, Col, Form, Button, Modal, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { Image } from "cloudinary-react";
import FirstCol from "./components/FirstCol";
import axios from "axios";

const EditPoem = () => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const poem = JSON.parse(localStorage.getItem("edit-poem"));
  const [title, setTitle] = useState(poem?.title);
  const [firstStanza, setFirstStanza] = useState(poem?.firstStanza);
  const [secondStanza, setSecondStanza] = useState(poem?.secondStanza);
  const [thirdStanza, setThirdStanza] = useState(poem?.thridStanza);
  const [fourthStanza, setFourthStanza] = useState(poem?.fourthStanza);
  const [firstPlag, setFirstPlag] = useState("");
  const [secondPlag, setSecondPlag] = useState("");
  const [thirdPlag, setThirdPlag] = useState("");
  const [fourthPlag, setFourthPlag] = useState("");
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [error, setError] = useState("");
  const [errorPl, setErrorPl] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [stanza, setStanza] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  const handleCloseC = () => setShowC(false);
  const handleShowC = () => setShowC(true);

  const handleCloseP = () => {
    setShowP(false);
    setPrivacy("");
    setFirstPlag("");
    setSecondPlag("");
    setThirdPlag("");
    setFourthPlag("");
    setReady(false);
    setCheck(false);
    setErrorPl("");
  };
  const handleShowP = () => {
    if (!title && !firstStanza) {
      setError("Please add your poem title and your first stanza.");
    } else if (!title) {
      setError("Please add your poem title.");
    } else if (!firstStanza) {
      setError("Please add your first stanza.");
    } else if (!secondStanza && (thirdStanza || fourthStanza)) {
      setError("Please add your second stanza.");
    } else if (!thirdStanza && fourthStanza) {
      setError("Please add your third stanza.");
    } else {
      setError("");
      setShowP(true);
    }
  };

  const onAdd = () => {
    if (!title && !firstStanza) {
      setError("Please add your poem title and your first stanza.");
    } else if (!title) {
      setError("Please add your poem title.");
    } else if (!firstStanza) {
      setError("Please add your first stanza.");
      setStanza(0);
    } else if (stanza === 1 && !secondStanza) {
      setError("Please add your second stanza.");
      setStanza(1);
    } else if (stanza === 2 && !thirdStanza) {
      setError("Please add your third stanza.");
      setStanza(2);
    } else {
      setStanza(stanza + 1);
      setError("");
    }
  };

  const onCheck = async () => {
    let formData = new FormData();
    formData.append("key", "350854a0fc0a44b3524bf4e3e610a67e");
    formData.append("data", firstStanza);
    await axios
      .post("https://www.prepostseo.com/apis/checkPlag", formData)
      .then((res) => {
        console.log(res.data);
        setFirstPlag(res.data);
        if (secondStanza) {
          formData.append("data", secondStanza);
          axios
            .post("https://www.prepostseo.com/apis/checkPlag", formData)
            .then((res) => {
              console.log(res.data);
              setSecondPlag(res.data);
              if (thirdStanza) {
                formData.append("data", thirdStanza);
                axios
                  .post("https://www.prepostseo.com/apis/checkPlag", formData)
                  .then((res) => {
                    console.log(res.data);
                    setThirdPlag(res.data);
                    if (fourthStanza) {
                      formData.append("data", fourthStanza);
                      axios
                        .post(
                          "https://www.prepostseo.com/apis/checkPlag",
                          formData
                        )
                        .then((res) => {
                          console.log(res.data);
                          setFourthPlag(res.data);
                          setCheck(true);
                        });
                    } else {
                      setCheck(true);
                    }
                  });
              } else {
                setCheck(true);
              }
            });
        } else {
          setCheck(true);
        }
      });
  };

  const checker = () => {
    if (check) {
      if (firstPlag && firstPlag.plagPercent < 10) {
        setReady(true);
      } else if (
        firstPlag &&
        firstPlag.plagPercent < 10 &&
        secondPlag &&
        secondPlag.plagPercent < 10
      ) {
        setReady(true);
      } else if (
        firstPlag &&
        firstPlag.plagPercent < 10 &&
        secondPlag &&
        secondPlag.plagPercent < 10 &&
        thirdPlag &&
        thirdPlag.plagPercent < 10
      )
        setReady(true);
      else if (
        firstPlag &&
        firstPlag.plagPercent < 10 &&
        secondPlag &&
        secondPlag.plagPercent < 10 &&
        thirdPlag &&
        thirdPlag.plagPercent < 10 &&
        fourthPlag &&
        fourthPlag.plagPercent < 10
      )
        setReady(true);
    }
  };

  const plagSpinner = (stanzaPlag) => {
    return (
      <>
        <br />
        {stanzaPlag ? (
          <span
            style={{
              color: stanzaPlag.plagPercent > 10 ? "red" : "green",
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {stanzaPlag.plagPercent}% Plagiarized
          </span>
        ) : (
          <Spinner
            className="ms-4"
            animation="border"
            variant="dark"
            size="sm"
          />
        )}
      </>
    );
  };

  const onSave = async () => {
    setLoading(true);
    if (!title && !firstStanza) {
      setError("Please add your poem title and your first stanza.");
    } else if (!title) {
      setError("Please add your poem title.");
    } else if (!firstStanza) {
      setError("Please add your first stanza.");
    } else if (!secondStanza && (thirdStanza || fourthStanza)) {
      setError("Please add your second stanza.");
    } else if (!thirdStanza && fourthStanza) {
      setError("Please add your third stanza.");
    } else {
      setError("");
      await axios
        .post("https://poetry-pad.herokuapp.com/api/editpoem", {
          id: poem.id,
          privacy: "private",
          isDraft: 1,
          title: title,
          firstStanza: firstStanza,
          secondStanza: secondStanza,
          thirdStanza: thirdStanza,
          fourthStanza: fourthStanza,
        })
        .then((res) => {
          setLoading(false);
          navigate("/collection");
          window.location.reload();
        });
    }
  };

  const onRepub = async () => {
    setLoading(true);
    await axios
      .post("https://poetry-pad.herokuapp.com/api/editpoem", {
        id: poem.id,
        title: title,
        privacy: privacy,
        isDraft: 0,
        firstStanza: firstStanza,
        secondStanza: secondStanza,
        thirdStanza: thirdStanza,
        fourthStanza: fourthStanza,
      })
      .then((res) => {
        setLoading(false);
        navigate("/dashboard");
        localStorage.removeItem("edit-poem");
      });
  };

  const onCancel = () => {
    navigate("/dashboard");
    window.location.reload();
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    if (poem.firstStanza) {
      setStanza(1);
      if (poem.secondStanza) {
        setStanza(2);
        if (poem.thirdStanza) {
          setStanza(3);
        }
      }
    }
  }, [user, poem, navigate]);
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    checker();
  });
  // ---------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------
  return (
    <>
      <div>
        <Row>
          <Col lg={3}>
            <FirstCol />
          </Col>
          <Col lg={7}>
            {/* {clickedPoem && ( */}
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
                {stanza >= 1 && (
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Second Stanza"
                      value={secondStanza}
                      onChange={(e) => setSecondStanza(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                )}
                {stanza >= 2 && (
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Third Stanza"
                      value={thirdStanza}
                      onChange={(e) => setThirdStanza(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                )}
                {stanza >= 3 && (
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Fourth Stanza"
                      value={fourthStanza}
                      onChange={(e) => setFourthStanza(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                )}
                <Form.Text className="text-danger">
                  {error && (
                    <Alert variant="danger" style={{ textAlign: "center" }}>
                      {error}
                    </Alert>
                  )}
                </Form.Text>
              </Form>
              {stanza <= 3 && (
                <Button
                  variant="light"
                  onClick={onAdd}
                  style={{ width: "95%" }}
                >
                  + Add Stanza
                </Button>
              )}
            </Row>
            {/* )} */}
          </Col>
          <Col lg={2} className="d-flex justify-content-center">
            <Row className="flex-column ">
              <Col style={{ textAlign: "end" }}>
                <Button
                  variant="dark"
                  className="np-col3"
                  onClick={() => {
                    handleShowP();
                    onCheck();
                  }}
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
                  Republish
                </Button>
                <br />
                <Button
                  variant="light"
                  className="np-col3"
                  onClick={onSave}
                  disabled={loading ? true : false}
                >
                  {loading && (
                    <Spinner
                      className="me-1"
                      animation="border"
                      variant="dark"
                      size="sm"
                      style={{ background: "none" }}
                    />
                  )}
                  Save as draft
                </Button>
                <br />
                <Button
                  variant="light"
                  className="np-col3"
                  onClick={handleShowC}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {/*------------------------------- modals ----------------------------- */}
        <Modal
          show={showC}
          onHide={handleCloseC}
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cancel Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure? Your modifications will be lost and no changes will be
            made after clicking 'Cancel'
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseC}>
              Back
            </Button>
            <Button variant="danger" onClick={onCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showP}
          onHide={handleCloseP}
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="in-title" style={{ textAlign: "left" }}>
              Modify Poem
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={3}>
                <p>Title: </p>
              </Col>
              <Col>
                <h4>{title}</h4>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <span>1st Stanza: </span>
                {plagSpinner(firstPlag)}
              </Col>
              <Col>
                <p
                  style={{
                    whiteSpace: "pre-line",
                  }}
                >
                  {firstStanza}
                </p>
              </Col>
            </Row>
            {secondStanza && (
              <Row>
                <Col md={3}>
                  <span>2nd Stanza: </span>
                  {plagSpinner(secondPlag)}
                </Col>
                <Col>
                  <p
                    style={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {secondStanza}
                  </p>
                </Col>
              </Row>
            )}
            {thirdStanza && (
              <Row>
                <Col md={3}>
                  <span>3rd Stanza: </span>
                  {plagSpinner(thirdPlag)}
                </Col>
                <Col>
                  <p
                    style={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {thirdStanza}
                  </p>
                </Col>
              </Row>
            )}
            {fourthStanza && (
              <Row>
                <Col md={3}>
                  <span>4th Stanza: </span>
                  {plagSpinner(fourthPlag)}
                </Col>
                <Col>
                  <p
                    style={{
                      whiteSpace: "pre-line",
                    }}
                  >
                    {fourthStanza}
                  </p>
                </Col>
              </Row>
            )}

            <Form className="mb-3">
              <Form.Label>Set As:</Form.Label>
              <br />
              <Form.Check
                inline
                custom
                label="Private"
                type="radio"
                name="radios"
                onClick={() => setPrivacy("private")}
              />
              <Form.Check
                inline
                label="Public"
                type="radio"
                name="radios"
                onClick={() => setPrivacy("public")}
                style={{}}
              />
            </Form>
            <p>
              Author:
              <br />
              {user.url ? (
                <Image
                  width={40}
                  height={40}
                  alt="profile picture"
                  cloudName="dabc77dwa"
                  publicID={user.url}
                  className="border border-2 border-gray rounded-3 shadow-sm text-align-right mx-1"
                />
              ) : (
                <MdAccountCircle
                  size={40}
                  className="border border-2 border-gray rounded-3 shadow-sm text-align-right mx-1"
                />
              )}
              {user?.penName}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseP}>
              Back
            </Button>
            <Button
              variant="dark"
              onClick={onRepub}
              disabled={
                loading
                  ? true
                  : !ready
                  ? true
                  : !privacy
                  ? true
                  : !errorPl
                  ? false
                  : true
              }
            >
              {(!check || loading) && (
                <Spinner
                  className="me-1"
                  animation="border"
                  variant="light"
                  size="sm"
                  style={{ background: "none" }}
                />
              )}
              {loading ? "Publishing" : check ? "Publish" : "Checking"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EditPoem;