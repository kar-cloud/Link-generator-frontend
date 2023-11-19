import React, { useState, useEffect } from "react";
import Message from "./message";
import axios from "axios";
import {
  BASE_URL,
  API_ENDPOINT_USER_LINK,
  API_ENDPOINT_USER_DETAILS,
} from "../../Constants";

const Generate = ({ links, setLinks, setSelectedLink }) => {
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
    pre_generated_url: null,
    custom_url: null,
  });
  const [message, setMessage] = useState(null);
  const [member, setMember] = useState(null);

  const handleInput = (event) => {
    setFileDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!fileDetails.description) {
      setMessage("Description is missing");
      setTimeout(() => {
        setMessage(null);
      }, 2500);
    } else if (!fileDetails.pre_generated_url) {
      setMessage("File URL is missing");
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
        pre_generated_url: "",
        custom_url: "",
      });
    }
  };

  return (
    <div>
      <div className="uploadFile">
        {message ? <Message message={message} /> : null}
        <div className="inputURLContainer">
          <div className="inputURL">
            <input
              className="inputURLInput"
              type="text"
              placeholder="URL to Shorten"
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                marginBottom: "0",
              }}
              value={fileDetails.pre_generated_url}
              name="pre_generated_url"
              onChange={handleInput}
            />
          </div>
        </div>
        <div>
          <textarea
            id="fileDescription"
            type="text"
            className="fileInputDescription"
            name="description"
            value={fileDetails.description}
            onChange={handleInput}
            placeholder="Enter Description"
            required
          />
        </div>
        {member ? (
          <div className="inputURLContainer">
            <div className="inputFixedContentURL">
              <p className="inputContent">{`${BASE_URL}${member.username}/`}</p>
            </div>
            <div className="inputURL">
              <input
                className="inputURLInput"
                type="text"
                placeholder="Enter URL (Separate words using hyphen)"
                maxLength={30}
                name="custom_url"
                value={fileDetails.custom_url}
                onChange={handleInput}
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

export default Generate;
