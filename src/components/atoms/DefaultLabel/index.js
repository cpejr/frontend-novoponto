import React from "react";
import DefaultLabelContainer from "./styles";
import { COLORS } from "../IdGlobal/colors";

const DefaultLabel = ({
	labelText,
	labelColor = COLORS.idcolor1,
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
