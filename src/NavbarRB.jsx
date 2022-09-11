import {
  Navbar,
  Container,
  Nav,
  Col,
  Row,
  Figure,
  Dropdown,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Logo from "./images/logo.svg";
import { MdAccountCircle } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Image } from "cloudinary-react";
import { useNavigate } from "react-router-dom";

const NavbarRB = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");
  const [showSB, setShowSB] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [showDD, setShowDD] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
    setActive(window.location.pathname);
    if (
      window.location.pathname === "/dashboard" ||
      window.location.pathname === "/profile" ||
      window.location.pathname === "/createpoem" ||
      window.location.pathname === "/thesaurus" ||
      window.location.pathname === "/rhymefinder" ||
      window.location.pathname === "/collection" ||
      window.location.pathname === "/collection/drafts"
    ) {
      setShowSB(true);
    } else setShowSB(false);
    if (window.location.pathname === "/createpoem") {
      setShow3D(true);
    } else setShow3D(false);
    return () => {
      console.log(active);
    };
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/signin");
    window.location.reload();
  };
  const allMenu = [
    {
      url: "/dashboard",
      name: "Poems Feed",
    },
    {
      url: "/profile",
      name: "Poet Profile",
    },
    {
      url: "/createpoem",
      name: "New Poem",
    },
    {
      url: "/collection",
      name: "Collection",
    },
    {
      url: "/collection/drafts",
      name: "Drafts",
    },
    {
      url: "/thesaurus",
      name: "Thesaurus",
    },
    {
      url: "/rhymefinder",
      name: "Rhyme Finder",
    },
  ];

  return (
    <div>
      {showSB === false ? (
        <Navbar
          bg="#FFFFFF"
          expand="md"
          variant="light"
          onToggle={() => setShow(!show)}
          className="my-4"
        >
          <Container>
            <Navbar.Brand href="/" style={{ margin: "0" }}>
              <Figure style={{ margin: "0" }}>
                <Figure.Image
                  width={130}
                  height={100}
                  alt="logo"
                  src={Logo}
                  style={{ margin: "0" }}
                />
              </Figure>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="myNav">
              {show ? (
                <Nav className="myNav">
                  <Nav.Link href="/">
                    <div>HOME</div>
                  </Nav.Link>
                  <Nav.Link href="/about">
                    <div>ABOUT US</div>
                  </Nav.Link>
                  {user ? (
                    <Nav.Link onClick={onLogout}>
                      <div>LOGOUT</div>
                    </Nav.Link>
                  ) : (
                    <>
                      <Nav.Link href="/signin">
                        <div>LOG IN</div>
                      </Nav.Link>
                      <Nav.Link href="/signup">
                        <div>SIGN UP</div>
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              ) : (
                <Nav className="myNav">
                  {active === "/" ? (
                    <Nav.Link className="myNav-btn-a" to="/">
                      <div className="myNav-btn-p-a">HOME</div>
                    </Nav.Link>
                  ) : (
                    <Nav.Link className="myNav-btn" href="/">
                      <div className="myNav-btn-p">HOME</div>
                    </Nav.Link>
                  )}
                  {active === "/about" ? (
                    <Nav.Link className="myNav-btn-a" href="/about">
                      <div className="myNav-btn-p-a">ABOUT US</div>
                    </Nav.Link>
                  ) : (
                    <Nav.Link className="myNav-btn" href="/about">
                      <div className="myNav-btn-p">ABOUT US</div>
                    </Nav.Link>
                  )}
                  {user ? (
                    <Nav.Link className="myNav-btn" onClick={onLogout}>
                      <div className="myNav-btn-p">LOGOUT</div>
                    </Nav.Link>
                  ) : (
                    <>
                      {active === "/signin" ? (
                        <Nav.Link className="myNav-btn-a" href="/signin">
                          <div className="myNav-btn-p-a">LOG IN</div>
                        </Nav.Link>
                      ) : (
                        <Nav.Link className="myNav-btn" href="/signin">
                          <div className="myNav-btn-p">LOG IN</div>
                        </Nav.Link>
                      )}
                      {active === "/signup" ? (
                        <Nav.Link className="myNav-btn-a" href="/signup">
                          <div className="myNav-btn-p-a">SIGN UP</div>
                        </Nav.Link>
                      ) : (
                        <Nav.Link className="myNav-btn" href="/signup">
                          <div className="myNav-btn-p">SIGN UP</div>
                        </Nav.Link>
                      )}
                    </>
                  )}
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <>
          <div className="my-2 border-bottom border-4 mb-5">
            <Row>
              <Col xs={4}>
                <Figure style={{ margin: "5px" }}>
                  <Figure.Image
                    width={80}
                    alt="logo"
                    src={Logo}
                    style={{ margin: "0", marginLeft: "40px" }}
                  />
                </Figure>
              </Col>
              <Col xs={4}>
                {allMenu.map((menu) => {
                  return (
                    <h1 className="in-title" key={menu.name}>
                      {menu.url === active && menu.name}
                    </h1>
                  );
                })}
              </Col>
              <Col xs={4} className="in-acc">
                <Dropdown>
                  <Dropdown.Toggle variant="none" className="in-right">
                    {user.url ? (
                      <Image
                        width={35}
                        height={35}
                        alt="profile picture"
                        cloudName="dabc77dwa"
                        publicID={user.url}
                        className="border border-1 border-dark rounded-3 shadow-sm"
                      />
                    ) : (
                      <MdAccountCircle size={35} />
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Account</Dropdown.Item>
                    <Dropdown.Item href="/collection/drafts">
                      Drafts
                    </Dropdown.Item>
                    <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarRB;
