import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Logo from "./images/logo.svg";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlinePlusSquare } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import { ImBooks } from "react-icons/im";
import { MdOutlineManageSearch, MdAccountBox } from "react-icons/md";
import { GiArchiveResearch } from "react-icons/gi";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {});

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
      icon: <GiArchiveResearch size={20} style={{ background: "none" }} />,
      url: "/thesaurus",
      name: "THESAURUS",
    },
    {
      icon: <MdOutlineManageSearch size={20} style={{ background: "none" }} />,
      url: "/rhymefinder",
      name: "RHYME FINDER",
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
          <div
            className="sidebar-container-s"
            style={{
              transition: "all 0.3s ease-in-out",
            }}
          >
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
                      <a href={menu.url} className="sb-link">
                        <div
                          style={{ background: "none", marginRight: "10px" }}
                        >
                          {menu.icon}
                        </div>
                        {menu.name}
                      </a>
                    </>
                  );
                })}
              </div>
            </Container>
          </div>
        ) : (
          <div
            className="sidebar-container-h"
            style={{
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Container className="sb-cont-h">
              <div className="sb-btn-cont" onClick={() => setShow(!show)}>
                <span onClick={() => setShow(!show)} className="sb-btn">
                  <GoThreeBars
                    size={20}
                    style={{ background: "none", color: "white" }}
                  />
                </span>
              </div>
              <div className="sb-link-cont">
                {allMenu.map((menu) => {
                  return (
                    <>
                      <a href={menu.url} className="sb-link p-2">
                        {menu.icon}
                      </a>
                    </>
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
