import { Select, Space } from 'antd';
import { SelectStyled } from './style';
const { Option } = Select;

const SelectFilter = ({ placeholder, data, handleChange }) => (
  <SelectStyled
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder={placeholder}
    optionLabelProp="label"
    onChange={handleChange}
  >
    {data.map(v => (
      <Option value={v._id} label={v.name}>
      <Space>
        {v.name}
      </Space>
    </Option>
    ))}
  </SelectStyled>
);
export default SelectFilter;