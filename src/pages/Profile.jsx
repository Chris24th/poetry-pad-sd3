import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Container, Row, Col, Card, Form, Figure } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import quill from "../images/quill.svg";
import { IoMdSettings } from "react-icons/io";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [profilePic, setProfilePic] = useState();
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
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={7} className="prof-cont">
          <Row className="justify-content-between">
            <Col
              sm={3}
              className="bg-black prof-cont-1 d-flex justify-content-center"
            >
              <Figure style={{ background: "none" }}>
                <Figure.Image
                  width={220}
                  height={150}
                  alt="profile picture"
                  src={profilePic && profilePic}
                  className="border border-4 border-secondary rounded-3 mt-5"
                />
              </Figure>
            </Col>
            <Col sm={8}>
              <div className="mb-5">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fs-3 fw-bold">{user.penName}</span>
                  <span className="prof-settings">
                    <IoMdSettings size={25} />
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
    </div>
  );
};

export default Profile;
