import React, { useState, useEffect } from "react";
import Message from "./message";
import axios from "axios";
import {
  BASE_URL,
  API_ENDPOINT_USER_LINK,
  API_ENDPOINT_USER_DETAILS,
} from "../../Constants";

const Upload = ({ links, setLinks, setSelectedLink }) => {
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(BASE_URL + API_ENDPOINT_USER_DETAILS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200 && response.data) {
          setMember(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserDetails();
  }, []);

  const [fileDetails, setFileDetails] = useState({
    description: "",
    file: null,
    custom_url: null,
  });
  const [message, setMessage] = useState(null);
  const [member, setMember] = useState(null);

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

  const handleCustomInputURL = (event) => {
    setFileDetails((prev) => ({
      ...prev,
      custom_url: event.target.value,
    }));
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!fileDetails.description) {
      setMessage("Description is missing");
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    } else if (!fileDetails.file) {
      setMessage("File is missing");
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    } else {
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
          setLinks([response.data, ...links]);
          setSelectedLink(response.data);
          setMessage("URL: " + response.data.link);
        }
      } catch (err) {
        console.log("ERROR ==> ", err);
      }
      setFileDetails({
        description: "",
        file: null,
        custom_url: null,
      });
    }
  };

  return (
    <div>
      <div className="uploadFile">
        {message ? <Message message={message} /> : null}
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
            id="fileDescription"
            type="text"
            className="fileInputDescription"
            name="password"
            value={fileDetails.description}
            onChange={handleInputDescription}
            placeholder="Enter File Description"
            required
          />
        </div>
        {member ? (
          <div className="inputURLContainer">
            <div className="inputFixedContentURL">
              <p className="inputContent">{`${BASE_URL}/${member.username}/`}</p>
            </div>
            <div className="inputURL">
              <input
                className="inputURLInput"
                type="text"
                placeholder="Enter URL (Separate words using hyphen)"
                maxLength={30}
                onChange={handleCustomInputURL}
              />
            </div>
          </div>
        ) : null}
        <button
          className="uploadButton"
          onClick={(event) => {
            handleUpload(event);
          }}
        >
          <p>Upload</p>
        </button>
      </div>
    </div>
  );
};

export default Upload;
