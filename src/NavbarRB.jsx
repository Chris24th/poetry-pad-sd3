import { Navbar, Container, Nav, Col, Figure } from "react-bootstrap";
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
  return (
    <div>
      <Navbar
        bg="#FFFFFF"
        expand="md"
        variant="light"
        onToggle={() => setShow(!show)}
        className="my-4"
      >
        <Container>
          <Navbar.Brand href="/" style={{ margin: "0" }}>
            <Figure>
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
    </div>
  );
};

export default NavbarRB;
