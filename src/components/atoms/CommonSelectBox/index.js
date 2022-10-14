import React from "react";
import CommonSelectBoxContainer from "./styles";
import diacriticCaseInsensitiveMatch from "../../../utils/diacriticCaseInsensitiveMatch";
import { Select } from "antd";

const { Option } = Select;

const CommonSelectBox = ({ optionsList = [], ...props }) => {
	return (
		<CommonSelectBoxContainer>
			<Select
				size="default"
				style={{ width: "100%" }}
				showSearch
				{...props}
				filterOption={(inputValue, option) =>
					diacriticCaseInsensitiveMatch(option.children, inputValue)
				}
			>
				{optionsList.map((item) => (
					<Option key={item.value} value={item.value}>
						{item.label}
					</Option>
				))}
			</Select>
		</CommonSelectBoxContainer>
	);
};

export default CommonSelectBox;
