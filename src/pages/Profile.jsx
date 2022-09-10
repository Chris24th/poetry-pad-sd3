import { useEffect } from "react";
import Sidebar from "../Sidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Profile;
