import React from 'react';
import CommonSelectBoxContainer from './styles';
import { Select } from 'antd';

const { Option } = Select;

const CommonSelectBox =
({inputRef, defaultValue, optionsList = [], onChangeFunction}) => {
    return (
        <CommonSelectBoxContainer>
            <Select
                size="default"
                ref={inputRef}
                defaultValue={defaultValue}
                onChange={onChangeFunction}
                style={{ width: '100%' }}
            >
                {optionsList.map(item =>
                    <Option key={item.value}>{item.label}</Option>
                )}
            </Select>
        </CommonSelectBoxContainer>
    );
}

export default CommonSelectBox
;