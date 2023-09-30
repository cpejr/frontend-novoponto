import { Select, Space } from 'antd';
import { SelectStyled } from './style';
const { Option } = Select;

const handleChange = (value) => {
  console.log({value});
};
const SelectFilter = ({ placeholder, data }) => (
  <SelectStyled
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder={placeholder}
    onChange={handleChange}
    optionLabelProp="label"
  >
    {data.map(v => (
      <Option value={v.name} label={v.name}>
      <Space>
        {v.name}
      </Space>
    </Option>
    ))}
  </SelectStyled>
);
export default SelectFilter;