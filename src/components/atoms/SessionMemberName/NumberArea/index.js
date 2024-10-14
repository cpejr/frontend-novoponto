import { Input } from "antd";
import NumberAreaContainer from "./styles";

const NumberAreaComponent = ({ ...props }) => {
  return (
    <NumberAreaContainer>
      <Input {...props} style={{ resize: "true" }} />
    </NumberAreaContainer>
  );
};
export default NumberAreaComponent;
