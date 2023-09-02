import { useState } from "react";
import { CommonButton, DefaultText, OutlinedBox } from "../../../components/atoms";
import { themedColors } from "../../../context/ThemeProvider/pallete";
import { EditColorComponent } from "./styles";
import { HexColorPicker } from "react-colorful";
import { Input } from "antd";

const EditColors = () => {


  const [primaryColorInput, setPrimaryColorInput] = useState('');
  const [secondColorInput, setSecondColorInput] = useState('')
  const [primaryColor, setPrimaryColor] = useState("#aabbcc");
  const [secondColor, setSecondColor] = useState("#ccbbaa")

  const handleInputColor = (input, number) => {
    const regex = /[0-9A-Fa-f]{6}/g;

    if(input.match(regex) && number === 1) {
      setPrimaryColor(input);
    }

    if(input.match(regex) && number === 2) {
      setSecondColor(input);
    }
  }

  return (
    <EditColorComponent theme={themedColors} className="">
      <OutlinedBox className="outlinedBox mx-auto mx-md-0">
        <DefaultText className="title">
              Editar as cores do site:
        </DefaultText>
        <div className="inputGroup">
          <DefaultText>Cor Primária:</DefaultText>
          <Input 
          value={primaryColorInput}
          onChange={(e) => setPrimaryColorInput(e.target.value)}
          placeholder={`${primaryColor}`}
          onPressEnter={(e) => handleInputColor(e.target.value, 1)}
          />
        </div>
        <HexColorPicker color={primaryColor} className="colorPicker"
        onChange={setPrimaryColor}/>
        <div className="inputGroup">
          <DefaultText>Cor Secundária:</DefaultText>
          <Input 
          value={secondColorInput}
          onChange={(e) => setSecondColorInput(e.target.value)}
          placeholder={`${secondColor}`}
          onPressEnter={(e) => handleInputColor(e.target.value, 2)}
          />
        </div>
        <HexColorPicker color={secondColor} className="colorPicker"
        onChange={setSecondColor}/>
        <div className="inputGroup">
					<CommonButton
						buttonLabel="Enviar"
						color="#22762B"
						width="100%"
					/>
				</div>
      </OutlinedBox>
    </EditColorComponent>
  )
}

export default EditColors;