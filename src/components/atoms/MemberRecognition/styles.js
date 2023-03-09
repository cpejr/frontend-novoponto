import styled from 'styled-components';

const MemberRecognitionContainer= styled.div`
  width: ${(props) => props.size || "50px"};
  height: ${(props) => props.size || "50px"};
  border-radius: 50%;
`;

export default MemberRecognitionContainer;