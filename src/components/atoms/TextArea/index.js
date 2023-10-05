import TextArea from "antd/lib/input/TextArea";
import TextAreaContainer from "./styles";

const TextAreaComponent = ({ ...props }) => {
  return (
    <TextAreaContainer>
      <TextArea {...props} style={{ resize: "true" }} />
    </TextAreaContainer>
  );
};
export default TextAreaComponent;

