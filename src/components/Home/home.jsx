import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../Services";
import { BASE_URL, API_ENDPOINT_USER_LINK } from "../../Constants";
import LinkCard from "./linkCard";
import Navbar from "./navbar";
import Links from "./links";
import Upload from "./upload";
import Generate from "./generate";

const Home = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);

  const getUserLinks = async (token) => {
    try {
      const response = await axios.get(BASE_URL + API_ENDPOINT_USER_LINK, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200 && response.data) {
        setLinks(response.data);
        setSelectedLink(response.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token)
        .then((isVerified) => {
          if (!isVerified) {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      getUserLinks(token);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Navbar />
      {window.location.pathname == "/upload" ? (
        <Upload
          links={links}
          setLinks={setLinks}
          setSelectedLink={setSelectedLink}
        />
      ) : window.location.pathname == "/generate" ? (
        <Generate
          links={links}
          setLinks={setLinks}
          setSelectedLink={setSelectedLink}
        />
      ) : (
        <div className="homeContainer">
          {links.length > 0 ? (
            <Links
              links={links}
              selectedLink={selectedLink}
              setSelectedLink={setSelectedLink}
            />
          ) : null}
          {selectedLink ? (
            <div className="rightHomeContainer">
              <LinkCard selectedLink={selectedLink} />
            </div>
          ) : (
            <h1 className="noLinksHeading">No files uploaded yet</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
