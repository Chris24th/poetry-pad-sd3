import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Figure,
  Modal,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import quill from "../images/quill.svg";
import { IoMdSettings } from "react-icons/io";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [profilePic, setProfilePic] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const [file] = e.target.files;
    setProfilePic(URL.createObjectURL(file));
  };

  const onSave = (e) => {
    e.preventDefault();
    console.log(profilePic);
  };

  useEffect(() => {
    // const []
    if (!user) {
      navigate("/signin");
    }
    setProfilePic(quill);
  }, []);

  return (
    <div>
      <Row>
        <Col md={3} className="mb-4">
          <Sidebar />
        </Col>
        <Col md={7} className="prof-cont">
          <Row className="justify-content-between m-3">
            <Col
              xs={3}
              className="bg-black prof-cont-1 d-flex justify-content-center"
            >
              <Figure style={{ background: "none" }}>
                <Figure.Image
                  width={220}
                  height={150}
                  alt="profile picture"
                  src={profilePic && profilePic}
                  className="border border-3 border-secondary rounded-3 mt-5"
                />
              </Figure>
            </Col>
            <Col xs={8}>
              <div className="mb-5">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fs-3 fw-bold">{user.penName}</span>
                  <span className="prof-settings">
                    <IoMdSettings size={25} onClick={handleShow} />
                  </span>
                </div>
                <label>Full Name</label>
                <span className="fs-5 bg-black text-light d-flex mb-2 p-1 ps-3">
                  {user.name}
                </span>
                <label>Email</label>
                <span className="fs-5 bg-black text-light d-flex mb-2 p-1 ps-3">
                  {user.email}
                </span>
                <label>Poems</label>
                <span className="fs-5 bg-black text-light d-flex p-1 ps-3">
                  xx
                </span>
              </div>
              <div>
                <label className="fw-bold mb-2">Bio</label>
                <br />
                <span>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta rem assumenda, nobis odio similique pariatur
                  consectetur at omnis, repellendus rerum quia? Omnis minus
                  suscipit dicta id dolores itaque impedit possimus!
                </span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col md={2}></Col>
      </Row>

      {/* ------------------------modal---------------------- */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="in-title">Poet Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <br />
              <Figure>
                <Figure.Image
                  width={200}
                  height={200}
                  alt="profile picture"
                  src={profilePic && profilePic}
                  className="border border-3 border-secondary rounded-3"
                />
              </Figure>
              <Form.Control
                type="file"
                size="sm"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
          <Button variant="dark" onClick={onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
