import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewPoem = () => {
  const [title, setTitle] = useState();
  const [firstStanza, setFirstStanza] = useState("");
  const [secondStanza, setSecondStanza] = useState("");
  const [thirdStanza, setThirdStanza] = useState("");
  const [fourthStanza, setFourthStanza] = useState("");
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [error, setError] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [stanza, setStanza] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  let url = user.url;

  const handleCloseC = () => setShowC(false);
  const handleShowC = () => setShowC(true);

  const handleCloseP = () => {
    setShowP(false);
    setPrivacy("");
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
  const onPublish = async () => {
    await axios
      .post("https://poetry-pad.herokuapp.com/api/createpoem", {
        penName: user.penName,
        privacy: privacy,
        isDraft: false,
        title: title,
        url: url,
        firstStanza: firstStanza,
        secondStanza: secondStanza,
        thirdStanza: thirdStanza,
        fourthStanza: fourthStanza,
      })
      .then((res) => {
        navigate("/dashboard");
        window.location.reload();
      });
  };
  const onSave = async () => {
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
        .post("https://poetry-pad.herokuapp.com/api/createpoem", {
          penName: user.penName,
          privacy: "private",
          isDraft: true,
          url: url,
          title: title,
          firstStanza: firstStanza,
          secondStanza: secondStanza,
          thirdStanza: thirdStanza,
          fourthStanza: fourthStanza,
        })
        .then((res) => {
          navigate("/collection");
          window.location.reload();
        });
    }
  };
  const onCancel = () => {
    navigate("/dashboard");
    window.location.reload();
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
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
                  onChange={(e) => {
                    setFirstStanza(e.target.value);
                    !e.target.value && setStanza(0);
                  }}
                ></Form.Control>
              </Form.Group>
              {stanza >= 1 && (
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Second Stanza"
                    value={secondStanza}
                    onChange={(e) => {
                      setSecondStanza(e.target.value);
                      !e.target.value && setStanza(1);
                    }}
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
                    onChange={(e) => {
                      setThirdStanza(e.target.value);
                      !e.target.value && setStanza(2);
                    }}
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
                    onChange={(e) => {
                      setFourthStanza(e.target.value);
                      !e.target.value && setStanza(3);
                    }}
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
            {stanza < 3 && (
              <Button variant="light" onClick={onAdd} style={{ width: "95%" }}>
                + Add Stanza
              </Button>
            )}
          </Row>
        </Col>
        <Col lg={3} className="d-flex justify-content-center">
          <Row className="flex-column ">
            <Col style={{ textAlign: "end" }}>
              <Button variant="dark" className="np-col3" onClick={handleShowP}>
                Publish
              </Button>
              <br />
              <Button variant="light" className="np-col3" onClick={onSave}>
                Save as draft
              </Button>
              <br />
              <Button variant="light" className="np-col3" onClick={handleShowC}>
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
          Are you sure? Your work will be lost after clicking 'Cancel'
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
            Publish Poem
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{title}</h4>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {firstStanza}
          </p>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {secondStanza}
          </p>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {thirdStanza}
          </p>
          <p
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {fourthStanza}
          </p>
          <p style={{ fontSize: "14px" }}>Author: {user?.penName}</p>
          <Form>
            <Form.Label>Set As:</Form.Label>
            <br />
            <Form.Check
              inline
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
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseP}>
            Back
          </Button>
          {privacy ? (
            <Button variant="dark" onClick={onPublish}>
              Publish
            </Button>
          ) : (
            <Button variant="dark" onClick={onPublish} disabled>
              Publish
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewPoem;
