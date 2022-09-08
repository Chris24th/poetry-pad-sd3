import { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
// import { HiBars3BottomRight } from "react-icons/hi";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? (
        <div className="sidebar-container-s">
          <Container className="sb-cont-s">
            <div className="sb-btn-cont">
              <span onClick={() => setShow(!show)} className="sb-btn">
                hide
              </span>
              {/* <HiBars3BottomRight /> */}
            </div>
            <div className="sb-link-cont">
              <Link to="/dashboard" className="sb-link">
                icon Active
              </Link>
              <Link to="/dashboard" className="sb-link">
                icon Link
              </Link>
            </div>
          </Container>
        </div>
      ) : (
        <div className="sidebar-container-h">
          <Container className="sb-cont-h">
            <div className="sb-btn-cont">
              <span onClick={() => setShow(!show)} className="sb-btn">
                show
              </span>
              {/* <HiBars3BottomRight /> */}
            </div>
            <div className="sb-link-cont">
              <Link to="/dashboard" className="sb-link">
                ic
              </Link>
              <Link to="/dashboard" className="sb-link">
                ic
              </Link>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Sidebar;
