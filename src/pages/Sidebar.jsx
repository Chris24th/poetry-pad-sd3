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

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? (
        <div fluid className="sidebar-container-s">
          <Nav
            defaultActiveKey="/dashboard"
            className="flex-column sidebar-nav"
          >
            <Row className="sidebar-row-btn">
              <Button onClick={() => setShow(!show)} className="sidebar-btn">
                show/hide
              </Button>
            </Row>
            <div className="sidebar-nav ">
              <Nav.Link href="/dashboard" className="sidebar-navlink">
                icon Active
              </Nav.Link>
              <Nav.Link href="/dashboard" className="sidebar-navlink">
                icon Link
              </Nav.Link>
            </div>
          </Nav>
        </div>
      ) : (
        <div fluid className="sidebar-container-h">
          <Nav
            defaultActiveKey="/dashboard"
            className="flex-column sidebar-nav"
          >
            <Button onClick={() => setShow(!show)}>show/hide</Button>
            <div className="sidebar-nav ">
              <Nav.Link href="/dashboard" className="sidebar-navlink">
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
