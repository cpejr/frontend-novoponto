import React from "react";
import MemberRecognitionContainer from "./styles";
import { Popover } from "antd";
import { useState } from "react";

const MemberRecognition = ({ recognition, ...props }) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hide = () => {
    setClicked(false);
    setHovered(false);
  };
  const handleHoverChange = (open) => {
    setHovered(open);
    setClicked(false);
  };
  const handleClickChange = (open) => {
    setHovered(false);
    setClicked(open);
  };

  if (recognition.length === 0) return <></>;

  return (
    <MemberRecognitionContainer>
      {recognition.map((e) => (
        <Popover
          key={e._id}
          style={{
            width: 500,
          }}
          content={e.name}
          trigger="hover"
          open={hovered}
          onOpenChange={handleHoverChange}
        >
          <Popover
            key={e._id}
            content={<div>{e.description}</div>}
            title={e.name}
            trigger="click"
            open={clicked}
            onOpenChange={handleClickChange}
          >
            <img
              style={{ width: "100%", height: "100%" }}
              src={e.url}
              alt={e.name}
              title={e.name}
            />
          </Popover>
        </Popover>
      ))}
    </MemberRecognitionContainer>
  );
};

export default MemberRecognition;
