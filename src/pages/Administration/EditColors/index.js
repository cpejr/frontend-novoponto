import { useState } from "react";
import { DefaultText, OutlinedBox } from "../../../components/atoms";
import { themedColors } from "../../../context/ThemeProvider/pallete";
import { ProfileComponent } from "./styles";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Input } from "antd";

const EditColors = () => {
  const [color, setColor] = useState("#aabbcc");

  return (
    <ProfileComponent theme={themedColors} className="">
      <OutlinedBox className="outlinedBox mx-auto mx-md-0">
        <DefaultText className="title">
              Editar as cores do site:
        </DefaultText>
        Cor Primária:
        <HexColorInput 
        placeholder={`${color}`}
        color={color}
        onChange={setColor}
        style={{background: "black"}}
        />
        <HexColorPicker color={color} onChange={setColor} />
      </OutlinedBox>
    </ProfileComponent>
  )
}

export default EditColors;