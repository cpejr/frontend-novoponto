import { Select, Space } from 'antd';


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
        defaultValue={initialValue}
        onChange={handleChange}
        options={optionsList}
      />
    </Space>
);
}
export default SelectMultiple;