import Sidebar from "../Sidebar";
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

const EditPoem = () => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const poem = JSON.parse(localStorage.getItem("edit-poem"));
  const [title, setTitle] = useState(poem?.title);
  const [firstStanza, setFirstStanza] = useState(poem?.firstStanza);
  const [secondStanza, setSecondStanza] = useState(poem?.secondStanza);
  const [thirdStanza, setThirdStanza] = useState(poem?.thridStanza);
  const [fourthStanza, setFourthStanza] = useState(poem?.fourthStanza);
  const [showP, setShowP] = useState(false);
  const [showC, setShowC] = useState(false);
  const [error, setError] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [stanza, setStanza] = useState(0);
  const navigate = useNavigate();

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
  const onRepub = async () => {
    await axios
      .post("https://poetry-pad.herokuapp.com/api/editpoem", {
        id: poem.id,
        title: title,
        firstStanza: firstStanza,
        secondStanza: secondStanza,
        thirdStanza: thirdStanza,
        fourthStanza: fourthStanza,
      })
      .then((res) => {
        navigate("/dashboard");
        localStorage.removeItem("edit-poem");
        window.location.reload();
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
  }, []);
  // ---------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------
  return (
    <>
      <div>
        <Row>
          <Col lg={3}>
            <Sidebar />
          </Col>
          <Col lg={6}>
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
          <Col lg={3} className="d-flex justify-content-center">
            <Row className="flex-column ">
              <Col style={{ textAlign: "end" }}>
                <Button
                  variant="dark"
                  className="np-col3"
                  onClick={handleShowP}
                >
                  Save
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
            <p>Author: {user?.penName}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseP}>
              Back
            </Button>
            <Button variant="dark" onClick={onRepub}>
              Republish
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default EditPoem;
