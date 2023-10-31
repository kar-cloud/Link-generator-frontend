import { formatDate, downloadFile } from "../../Services";
import axios from "axios";
import { React } from "react";
import { BASE_URL, API_ENDPOINT_USER_LINK } from "../../Constants";

const LinkCard = ({ selectedLink }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}${API_ENDPOINT_USER_LINK}${selectedLink.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <u>
        <a href={selectedLink.link} target="_blank">
          <h2 className="rightContainerHeading">{selectedLink.link}</h2>
        </a>
      </u>
      <p className="rightContainerLabels">Created At:</p>
      <p>{formatDate(selectedLink.created_at)}</p>
      <p className="rightContainerLabels">Description:</p>
      <p>{selectedLink.description}</p>
      <p className="rightContainerLabels">File Path:</p>
      <a href={selectedLink.file}>
        <h6 className="rightContainerFilePath">{selectedLink.file}</h6>
      </a>
      <hr className="rightContainerLine" />
      <button
        className="rightContainerButtons"
        onClick={() => {
          downloadFile(selectedLink.file);
        }}
      >
        <p>Download</p>
      </button>
      <button
        className="rightContainerButtons"
        onClick={() => {
          handleDelete();
          window.location.reload();
        }}
      >
        <p>Delete</p>
      </button>
    </div>
  );
};

export default LinkCard;
