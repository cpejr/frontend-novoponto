import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const props = {
  name: 'Imagem',
  onChange(info) {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


export default function BadgeInput({ form }) {
  const handleUpload = (file) => {
    form.setFieldsValue({ Imagem: file });
  };

  const beforeUpload = (file) => {
    handleUpload(file);
    return false; // Evita o upload automático do arquivo
  };

  return (
    <Upload {...props} beforeUpload={beforeUpload} maxCount={1}>
      <Button icon={<UploadOutlined />}>Clique para enviar</Button>
    </Upload>
  );
}