import React, { useEffect } from "react";
import Modal from "../../molecules/ConfirmationModal";
import AutoCompleteInput from "../../molecules/AutocompleteInput";
import { CommonSelectBox, InputText } from "../../atoms";
import { Form } from "antd";

// This Modal recieves an array of fields and deals with each one of them, including its type and validation
// It can be used to create or edit any object, since the object has only simple keys (no arrays or objects inside it)
// To edit, just pass the previous object as props

// To setup the fields, you need to pass an array of them. Each field has to be structed as the following:

// const field = {
//   key: "key name of the field, as in original object (or the key for the new one), examples: "name", "age", etc ",
//   type: "text, select or autocomplete (further options can be developed)",
//   label: "label for the input",
//   validator: "function called on validation. Should return "ok" or an error message. For text or select, receives only the input value; for autocomplete, receives the value and an array of its options",
//   placeholder: "the place holder of the field"
//   options: "in case its an autocomplete or select, the possible options",
//   initialValue: "the initial value of the field"
//   rules: "array of antd's rule functions" https://ant.design/components/form/#components-form-demo-register
// };

const FormModal = ({ title, fields, onSubmit, open, cancel }) => {
  const [form] = Form.useForm();

  // Setting up the information when the modal is open
  useEffect(() => {
    if (fields) {
      form.resetFields();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields, open]);

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();

      onSubmit && onSubmit(data);
    } catch (error) {}
  };

  //Setting up the form fields
  var showingFields = fields?.map((field) => {
    const { type, label, options, placeholder, initialValue, rules } = field;

    let inputField;
    switch (type) {
      case "autoComplete":
        inputField = (
          <AutoCompleteInput
            options={options}
            placeholder={placeholder}
            initialValue={initialValue}
          />
        );
        break;
      case "select":
        inputField = (
          <CommonSelectBox optionsList={options} placeholder={placeholder} />
        );
        break;

      default:
      case "text":
        inputField = <InputText placeholder={placeholder} />;
        break;
    }

    return (
      <Form.Item
        name={label}
        label={label}
        rules={rules}
        hasFeedback
        initialValue={initialValue}
      >
        {inputField}
      </Form.Item>
    );
  });

  return (
    <Modal
      isVisible={open}
      handleCancel={cancel}
      handleOk={handleSubmit}
      title={title}
    >
      <Form layout="vertical" form={form}>
        {showingFields}
      </Form>
    </Modal>
  );
};

export default FormModal;
