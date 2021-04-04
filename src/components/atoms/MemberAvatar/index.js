import React from "react";
import MemberAvatarContainer from "./styles";

import avatarDefault from "../../../assets/defaultAvatar.svg";

const MemberAvatar = ({ src = avatarDefault, ...props }) => {
  return <MemberAvatarContainer src={src} {...props} />;
};

export default MemberAvatar;
