import React, { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import DefaultLabelContainer from "./styles";

const DefaultLabel = ({
	labelText,
	labelWidth = "auto",
	labelMargin = "0",
	className,
}) => {
	const { themeColors } = useContext(ThemeContext);
	return (
		<DefaultLabelContainer
			className={className}
			color={themeColors.primaryColor}
			width={labelWidth}
			margin={labelMargin}
		>
			{labelText}
		</DefaultLabelContainer>
	);
};

export default DefaultLabel;
