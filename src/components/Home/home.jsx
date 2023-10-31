import axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../Services";
import { BASE_URL, API_ENDPOINT_USER_LINK } from "../../Constants";
import LinkCard from "./linkCard";

const Home = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState({});
  const [fileDetails, setFileDetails] = useState({
    description: "",
    file: null,
  });

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

  const handleInputFile = (event) => {
    setFileDetails((prev) => ({
      ...prev,
      file: event.target.files[0],
    }));
  };

  const handleInputDescription = (event) => {
    setFileDetails((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    console.log(fileDetails);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        BASE_URL + API_ENDPOINT_USER_LINK,
        fileDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      if (response && response.status == 201) {
        window.location.reload();
      }
    } catch (err) {
      console.log("ERROR ==> ", err);
    }
  };

  return (
    <div>
      <div className="homeContainer">
        <div className="uploadFile">
          <div className="fileInputBox" style={{ cursor: "default" }}>
            <input
              id="inputUpload"
              type="file"
              name="image"
              style={{ display: "none" }}
              onChange={handleInputFile}
            />
            <label
              htmlFor="inputUpload"
              name="image"
              style={{
                cursor: "pointer",
                fontSize: "inherit",
              }}
            >
              {fileDetails.file ? fileDetails.file.name : "Select your file"}
            </label>
          </div>
          <div>
            <textarea
              id="passwordInput"
              type="text"
              className="fileInputDescription"
              name="password"
              onChange={handleInputDescription}
              placeholder="Enter File Description"
              required
            />
          </div>
          <button
            className="uploadButton"
            onClick={(event) => {
              handleUpload(event);
              // window.location.reload();
            }}
          >
            <p>Upload</p>
          </button>
        </div>
      </div>
      <hr className="uploadLine" />
      <div className="homeContainer">
        <div className="leftHomeContainer">
          {links
            ? links.map((link, index) => {
                return (
                  <div
                    key={index}
                    className={
                      selectedLink.id == link.id
                        ? "leftBox highlight"
                        : "leftBox"
                    }
                    onClick={() => {
                      setSelectedLink(link);
                    }}
                  >
                    <p className="leftBoxText">{link.description}</p>
                  </div>
                );
              })
            : null}
        </div>
        {selectedLink ? (
          <div className="rightHomeContainer">
            <LinkCard selectedLink={selectedLink} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
