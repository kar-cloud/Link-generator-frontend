import { formatDate, downloadFile } from "../../Services";
import axios from "axios";
import { React } from "react";
import {
  BASE_URL,
  API_ENDPOINT_USER_LINK,
  WHATSAPP_URL,
} from "../../Constants";

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

  const createWhatsappURL = (link) => {
    const whatsappMessage = `Come and check out this link:%0A${link.link}%0A%0ADescription - ${link.description}`;
    const url = `${WHATSAPP_URL}?text=${whatsappMessage}`;
    return url;
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
      <p className="rightContainerLabels">Analytics:</p>
      <span>No of clicks - {selectedLink.analytics.no_of_clicks}</span>
      <br />
      <span>
        No of unique viewers - {selectedLink.analytics.no_of_unique_viewers}
      </span>
      <br />
      <br />
      <p className="rightContainerLabels">QR Code:</p>
      <img
        src={selectedLink.qr_code}
        height={120}
        width={120}
        style={{ display: "inline-block" }}
      />
      <button
        className="downloadButton"
        onClick={() => {
          downloadFile(selectedLink.qr_code, "QR.png");
        }}
      >
        <p>Download QR</p>
      </button>
      <br />
      <p className="rightContainerLabels">File Path:</p>
      <a href={selectedLink.file}>
        <h6 className="rightContainerFilePath">{selectedLink.file}</h6>
      </a>
      <hr className="rightContainerLine" />
      <a
        href={createWhatsappURL(selectedLink)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="shareButton">Share on WhatsApp</button>
      </a>
      <button
        className="rightContainerButtons"
        onClick={() => {
          downloadFile(selectedLink.file);
        }}
      >
        <p>Download File</p>
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
