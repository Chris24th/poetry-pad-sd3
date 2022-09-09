import { Navbar, Container, Nav, Col, Row, Figure } from "react-bootstrap";
import { useState, useEffect } from "react";
import Logo from "./images/logo.svg";

const NavbarRB = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");
  const user = JSON.parse(localStorage.getItem("user-data"));

  useEffect(() => {
    setActive(window.location.pathname);

    return () => {
      console.log(active);
    };
  }, []);

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const allMenu = [
    {
      url: "/dashboard",
      name: "Poems Feed",
    },
    {
      url: "/collection",
      name: "collection",
    },
    {
      url: "/thesaurus",
      name: "Thesaurus",
    },
    {
      url: "/rhymefinder",
      name: "Rhyme Finder",
    },
    {
      url: "/profile",
      name: "Poet Profile",
    },
  ];

  return (
    <div>
      {active != "/dashboard" ||
      active != "/profile" ||
      active != "/thesaurus" ? (
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
              <Col xs={4} className="in-title">
                {allMenu.map((menu) => {
                  return <>{menu.url === active && menu.name}</>;
                })}
              </Col>
              <Col xs={4} className="in-acc">
                Account
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarRB;
