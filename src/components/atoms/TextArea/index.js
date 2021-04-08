import TextArea from "antd/lib/input/TextArea";

const TextAreaComponent = ({ ...props }) => {
  return <TextArea { ...props } style={{ resize: props.resize || "true" }} />;
};
export default TextAreaComponent;
