import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Logo from "../images/logo.svg";
import { AiFillHome } from "react-icons/ai";
// import { HiBars3BottomRight } from "react-icons/hi";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? (
        <div fluid className="sidebar-container-s">
          <Nav defaultActiveKey="/dashboard" className="flex-column nav-s">
            <div className="sidebar-row-btn">
              <button onClick={() => setShow(!show)} className="sidebar-btn">
                show/hide
              </button>
              {/* <HiBars3BottomRight /> */}
            </div>
            <Row className="sidebar-navlink-cont ">
              <Nav.Link
                href="/dashboard"
                className="sidebar-navlink"
                style={{ color: "black", fontWeight: "bold" }}
              >
                icon Active
              </Nav.Link>
              <Nav.Link href="/dashboard" className="sidebar-navlink">
                icon Link
              </Nav.Link>
            </Row>
          </Nav>
        </div>
      ) : (
        <div fluid className="sidebar-container-h">
          <Nav defaultActiveKey="/dashboard" className="flex-column nav-h">
            <div className="sidebar-row-btn">
              <button onClick={() => setShow(!show)} className="sidebar-btn">
                //
              </button>
            </div>
            <div className="sidebar-navlink-cont ">
              <Nav.Link href="/dashboard" className="sidebar-navlink">
                <AiFillHome />
                icon
              </Nav.Link>
              <Nav.Link href="/dashboard" className="sidebar-navlink">
                icon
              </Nav.Link>
            </div>
          </Nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
