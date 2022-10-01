import React from "react";
import DefaultLabelContainer from "./styles";

const DefaultLabel = ({
	labelText,
	labelColor = "#ffd100",
	labelWidth = "auto",
	labelMargin = "0",
	...props
}) => {
	return (
		<DefaultLabelContainer
			{...props}
			color={labelColor}
			width={labelWidth}
			margin={labelMargin}
		>
			{labelText}
		</DefaultLabelContainer>
	);
};

export default DefaultLabel;
