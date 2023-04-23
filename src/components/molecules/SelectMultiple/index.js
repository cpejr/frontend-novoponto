import { Select, Space } from 'antd';
import { useState } from 'react';


function SelectMultiple({optionsList, placeholder, initialValue, form}){
  const handleChange = (value) => {
    form.setFieldsValue({ Reconhecimento: value });
  };
  return (
    <Space
      style={{
        width: '100%',
      }}
      direction="vertical"
    >
      <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        placeholder={placeholder}
        onChange={handleChange}
        options={optionsList}
        defaultValue={initialValue}
      />
    </Space>
);
}
export default SelectMultiple;