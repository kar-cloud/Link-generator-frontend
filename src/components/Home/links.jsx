import React from "react";

const Links = ({ links, selectedLink, setSelectedLink }) => {
  return (
    <div className="leftHomeContainer">
      {links.map((link, index) => {
        return (
          <div
            key={index}
            className={
              selectedLink.id == link.id ? "leftBox highlight" : "leftBox"
            }
            onClick={() => {
              setSelectedLink(link);
            }}
          >
            <p className="leftBoxText">{link.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Links;
