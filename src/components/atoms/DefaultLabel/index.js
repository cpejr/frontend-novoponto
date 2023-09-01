import React from "react";
import DefaultLabelContainer from "./styles";
import { colors } from "../../../context/ThemeProvider/pallete";

const DefaultLabel = ({
	labelText,
	labelColor = colors.primaryColor,
	labelWidth = "auto",
	labelMargin = "0",
	className,
}) => {
	return (
		<DefaultLabelContainer
			className={className}
			color={labelColor}
			width={labelWidth}
			margin={labelMargin}
		>
			{labelText}
		</DefaultLabelContainer>
	);
};

export default DefaultLabel;
