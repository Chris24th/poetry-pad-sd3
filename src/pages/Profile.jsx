import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import {
  Row,
  Col,
  Form,
  Figure,
  Modal,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { Image } from "cloudinary-react";
import { MdAccountCircle } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(user?.url);
  const [newUrl, setNewUrl] = useState();
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = async (e) => {
    let profilePic = e.target.files[0];
    const [file] = e.target.files;
    setPic(URL.createObjectURL(file));
    console.log(profilePic);
    const formData = new FormData();
    formData.append("file", profilePic);
    formData.append("upload_preset", "jh34uvpf");
    await axios
      .post("https://api.cloudinary.com/v1_1/dabc77dwa/image/upload", formData)
      .then((res) => {
        setUrl(res.data.secure_url);
        setNewUrl(res.data.secure_url);
        console.log(res.data.secure_url);
      });
  };

  const onSave = (e) => {
    e.preventDefault();
    api();
    setShow(false);
  };

  const api = async () => {
    await axios
      .post("https://poetry-pad.herokuapp.com/api/editprofile", {
        id: user.id,
        url: url,
        name: name,
        bio: bio,
        penName: user.penName,
      })
      .then((res) => {
        localStorage.setItem("user-data", JSON.stringify(res.data));
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    api();
  });

  return (
    <>
      {user && (
        <div>
          <Row>
            <Col md={3} className="mb-4">
              <Sidebar />
            </Col>
            <Col md={7}>
              <Row className="justify-content-between m-3">
                <Col
                  xs={3}
                  className=" bg-black bg-gradient prof-cont-1 d-flex justify-content-center"
                >
                  <Figure
                    className="d-flex justify-content-center"
                    style={{ background: "none" }}
                  >
                    {user.url ? (
                      <Image
                        alt="profile picture"
                        cloudName="dabc77dwa"
                        publicID={user.url}
                        className="border border-3 border-secondary rounded-4 mt-4 prof-pp"
                      />
                    ) : (
                      <MdAccountCircle className="border border-3 border-secondary rounded-4 mt-4 prof-pp" />
                    )}
                  </Figure>
                </Col>
                <Col xs={8}>
                  <div className="mb-5">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fs-3 fw-bold fst-italic ">
                        {user.penName}
                      </span>
                      <span className="prof-settings">
                        <IoMdSettings size={25} onClick={handleShow} />
                      </span>
                    </div>
                    <label>Full Name</label>
                    <span className="fs-5 bg-dark bg-gradient text-light rounded-2 d-flex mb-2 p-1 ps-3">
                      {user.name}
                    </span>
                    <label>Email</label>
                    <span className="fs-5 bg-dark text-light rounded-2 d-flex mb-2 p-1 ps-3">
                      {user.email}
                    </span>
                    <label>Published Poems</label>
                    <span className="fs-5 bg-dark text-light rounded-2 d-flex p-1 ps-3">
                      {user.publishedPoems ? user.publishedPoems : "none"}
                    </span>
                  </div>
                  <div>
                    <label className="fw-bold mb-2">Bio</label>
                    <br />
                    <span>{user.bio ? user.bio : "No bio"}</span>
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
            style={{ background: "rgba(0,0,0,0.2)" }}
          >
            <Modal.Header closeButton>
              <Modal.Title className="in-title">Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Picture</Form.Label>
                  <br />
                  {pic && (
                    <Figure>
                      <Figure.Image
                        width={200}
                        height={200}
                        alt="profile picture"
                        src={pic}
                        className="border border-3 border-secondary rounded-3"
                      />
                    </Figure>
                  )}
                  <Form.Control
                    type="file"
                    size="sm"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => {
                      setBio(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Back
              </Button>
              {pic ? (
                newUrl ? (
                  <Button variant="dark" onClick={onSave}>
                    Save Changes
                  </Button>
                ) : (
                  <Button variant="dark" onClick={onSave} disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      style={{ background: "none" }}
                    />{" "}
                    Save Changes
                  </Button>
                )
              ) : (
                <Button variant="dark" onClick={onSave}>
                  Save Changes
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Profile;
