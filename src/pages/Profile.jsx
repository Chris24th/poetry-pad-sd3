import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Row, Col, Form, Figure, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { Image } from "cloudinary-react";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState(user?.url);
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
      });
  };

  const onSave = async (e) => {
    e.preventDefault();

    {
      url && api();
    }
  };

  const api = async () => {
    axios
      .post("https://poetry-pad.herokuapp.com/api/editprofile", {
        id: user.id,
        url: url,
        name: name,
        bio: bio,
        penName: user.penName,
      })
      .then((res) => {
        localStorage.setItem("user-data", JSON.stringify(res.data));
        window.location.reload();
        setShow(false);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      {user && (
        <div>
          <Row>
            <Col lg={3} className="mb-4">
              <Sidebar />
            </Col>
            <Col lg={7} className="prof-cont">
              <Row className="justify-content-between m-3">
                <Col
                  xs={3}
                  className="bg-black prof-cont-1 d-flex justify-content-center"
                >
                  <Figure
                    className="d-flex justify-content-center"
                    style={{ background: "none" }}
                  >
                    {user.url && (
                      <Image
                        alt="profile picture"
                        cloudName="dabc77dwa"
                        publicID={user.url}
                        className="border border-3 border-secondary rounded-3 mt-4 prof-pp"
                      />
                    )}
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
                    <label>Published Poems</label>
                    <span
                      className="fs-5 bg-black text-light d-flex p-1 ps-3"
                      onClick={() => {
                        api();
                      }}
                    >
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
          >
            <Modal.Header closeButton>
              <Modal.Title className="in-title">Poet Profile</Modal.Title>
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
              <Button variant="dark" onClick={onSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Profile;
