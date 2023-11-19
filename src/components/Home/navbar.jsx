import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("links");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div>
      <ul>
        <li>
          <Link
            to={"/home"}
            className={
              activeLink == "links" ? "navbarLink activeLink" : "navbarLink"
            }
            onClick={() => {
              handleLinkClick("links");
            }}
          >
            Links
          </Link>
        </li>
        <li>
          <Link
            to={"/upload"}
            className={
              activeLink == "upload" ? "navbarLink activeLink" : "navbarLink"
            }
            onClick={() => {
              handleLinkClick("upload");
            }}
          >
            Upload
          </Link>
        </li>
        <li>
          <Link
            to={"/generate"}
            className={
              activeLink == "generate" ? "navbarLink activeLink" : "navbarLink"
            }
            onClick={() => {
              handleLinkClick("generate");
            }}
          >
            Generate
          </Link>
        </li>
        <li>
          <Link
            to={"/"}
            className={
              activeLink == "logout" ? "navbarLink activeLink" : "navbarLink"
            }
            onClick={() => {
              handleLinkClick("logout");
              localStorage.removeItem("token");
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
