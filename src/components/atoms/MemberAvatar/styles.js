import styled from "styled-components";

const MemberAvatarContainer = styled.img`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  border-radius: 50%;
`;

export default MemberAvatarContainer;
