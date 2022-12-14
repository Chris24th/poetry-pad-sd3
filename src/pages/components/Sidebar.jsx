import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { AiFillHome, AiOutlinePlusSquare } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import { ImBooks } from "react-icons/im";
import { MdAccountBox } from "react-icons/md";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const allMenu = [
    {
      icon: <AiFillHome size={20} style={{ background: "none" }} />,
      url: "/dashboard",
      name: "POEMS FEED",
    },
    {
      icon: <ImBooks size={20} style={{ background: "none" }} />,
      url: "/collection",
      name: "COLLECTION",
    },
    {
      icon: <MdAccountBox size={20} style={{ background: "none" }} />,
      url: "/profile",
      name: "PROFILE",
    },
    {
      icon: <AiOutlinePlusSquare size={20} style={{ background: "none" }} />,
      url: "/createpoem",
      name: "NEW POEM",
    },
  ];

  return (
    <>
      {/* {window.innerWidth > 600 ? ( */}
      <>
        {show ? (
          <div className="sidebar-container-s">
            <Container className="sb-cont-s">
              <div className="sb-btn-cont" onClick={() => setShow(!show)}>
                <span className="sb-btn">
                  <GoThreeBars
                    size={20}
                    style={{
                      background: "none",
                      color: "white",
                    }}
                  />
                </span>
              </div>
              <div className="sb-link-cont">
                {allMenu.map((menu) => {
                  return (
                    <>
                      <a
                        href={menu.url}
                        className={
                          active === menu.url
                            ? "sb-link-active mt-1"
                            : "sb-link mt-1"
                        }
                        style={{
                          transition: "all 0.4s ease ",
                        }}
                      >
                        <div
                          style={{
                            background: "none",
                            marginRight: "10px",
                            transition: "all 0.2s ease ",
                          }}
                        >
                          {menu.icon}
                        </div>
                        <span
                          style={{
                            background: "none",
                            transition: "all 0.1s ease ",
                          }}
                        >
                          {menu.name}
                        </span>
                      </a>
                    </>
                  );
                })}
              </div>
            </Container>
          </div>
        ) : (
          <div className="sidebar-container-h">
            <Container className="sb-cont-h">
              <div className="sb-btn-cont" onClick={() => setShow(!show)}>
                <span className="sb-btn">
                  <GoThreeBars
                    size={20}
                    style={{ background: "none", color: "white" }}
                  />
                </span>
              </div>
              <div className="sb-link-cont">
                {allMenu.map((menu) => {
                  return (
                    <div
                      key={menu.name}
                      style={{
                        background: "none",
                        display: "inherit",
                        alignItems: "center",
                      }}
                    >
                      <a
                        href={menu.url}
                        className={
                          active === menu.url
                            ? "sb-link-active p-2 mt-1"
                            : "sb-link p-2 mt-1"
                        }
                        style={{
                          transition: "all 0.4s ease ",
                        }}
                      >
                        <div
                          style={{
                            background: "none",
                            transition: "all 0.2s ease ",
                          }}
                        >
                          {menu.icon}
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>
        )}
      </>
      {/* ) : null} */}
    </>
  );
};

export default Sidebar;
