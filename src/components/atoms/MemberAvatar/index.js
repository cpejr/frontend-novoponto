import React from "react";
import MemberAvatarContainer from "./styles";

import avatarDefault from "../../../assets/defaultAvatar.svg";

const MemberAvatar = ({ src = avatarDefault, ...props }) => {
  let _src = src;
  if (!_src) _src = avatarDefault;

  return <MemberAvatarContainer src={_src} {...props} />;
};

export default MemberAvatar;
