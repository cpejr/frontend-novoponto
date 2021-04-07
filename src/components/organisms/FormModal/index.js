import React, { useState, useEffect } from "react";
import { FormContainer } from "./styles";
import Modal from "../../molecules/Modal";
import AutoCompleteInput from "../../molecules/AutocompleteInput";
import { InputText, SelectInput } from "../../atoms";

// This Modal recieves an array of fields and deals with each one of them, including its type and validation
// It can be used to create or edit any object, since the object has only simple keys (no arrays or objects inside it)
// To edit, just pass the previous object as props

// To setup the fields, you need to pass an array of them. Each field has to be structed as the following:

// const field = {
//   key: "key name of the field, as in original object (or the key for the new one), examples: "name", "age", etc ",
//   type: "text, select or autocomplete (further options can be developed)",
//   label: "label for the input",
//   validator: "function called on validation. Should return "ok" or an error message. For text or select, receives only the input value; for autocomplete, receives the value and an array of its options",

//   options: "in case its an autocomplete or select, the possible options",
// };

const FormModal = ({
  title,
  fields,
  callback,
  open,
  cancel,
  originalObject,
}) => {
  //The current value of the object that will be returned
  const [currentValue, setCurrentValue] = useState({});
  
  // Array representing reset flag for each field in the form
  const [reset, setReset] = useState([]);
  
  // Array representing error object for each field in the form
  const [error, setError] = useState([]);

  // Setting up the information when the modal is open
  useEffect(() => {
    // If the goal is to update one object, this will be its initial value
    if (originalObject) setCurrentValue({ ...originalObject });

    if (fields) {
      //If the goal is to create a new object, we need to set the inputs to empty strings
      if (!originalObject) {
        fields.forEach((field) => {
          currentValue[field.key] = "";
        });

        setCurrentValue({ ...currentValue });
      }

      //Setting the error object as false for each field
      setError(
        fields.map(() => {
          return { error: false, errorMessage: "" };
        })
      );

      //Setting the reset flag as false for each field
      setReset(
        fields &&
          fields.map(() => {
            return false;
          })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalObject, fields]);

  //Seting the value of the object that will be returned when select confirm
  const handleChangeObject = (key, index, value) => {
    reset[index] = true;
    setReset([...reset]);
    currentValue[key] = value;
    setCurrentValue({ ...currentValue });
    error[index] = { error: false, errorMessage: "" };
    setError([...error]);
  };

  const handleConfirm = () => {
    var isOk = true;
    var validation;

    //Validate each field using its validator. If its a autocomplete, we need to check if the value exists in option array. The validator returns "ok" or an error message
    fields.forEach((field, index) => {
      if (field.type === "autoComplete")
        validation = field.validator(currentValue[field.key], field.options);
      if (field.type === "text" || field.type === "select")
        validation = field.validator(currentValue[field.key]);

      //In case a validation fails, we can't send the object yet, so we set an error in the field and prevent the callback
      if (validation !== "ok") {
        isOk = false;
        error[index] = { error: true, errorMessage: validation };
        setError([...error]);
      }
    });
  
    //If every validation is ok, we call the callback
    if (isOk) {
      callback(currentValue);
    }
  };

  //Setting up the form fields
  var showingFields =
    fields &&
    fields.map((field, index) => {
      var returnField;
      if (field.type === "text") {
        returnField = (
          <>
            {field.label}
            <InputText
              value={originalObject ? originalObject[field.key] : ""}
              onChange={(e) =>
                handleChangeObject(field.key, index, e.target.value)
              }
              error={error[index] ? error[index].error : false}
              errorMessage={error[index] ? error[index].errorMessage : false}
            />
          </>
        );
      }
      if (field.type === "autoComplete") {
        returnField = (
          <>
            {field.label}
            <AutoCompleteInput
              options={field.options}
              callback={(value) => handleChangeObject(field.key, index, value)}
              resetAutocompleteField={reset[index]}
              initValue={originalObject ? originalObject[field.key] : ""}
              error={error[index] ? error[index].error : false}
              errorMessage={error[index] ? error[index].errorMessage : false}
            />
          </>
        );
      }
      if (field.type === "select") {
        returnField = (
          <>
            {field.label}
            <SelectInput
              options={field.options}
              callback={(value) => handleChangeObject(field.key, index, value)}
              value={originalObject ? originalObject[field.key] : ""}
              error={error[index] ? error[index].error : false}
              errorMessage={error[index] ? error[index].errorMessage : false}
            />
          </>
        );
      }
      return returnField;
    });

  return (
    <Modal
      isVisible={open}
      handleCancel={cancel}
      handleOk={handleConfirm}
      title={title}
    >
      <FormContainer>{showingFields}</FormContainer>
    </Modal>
  );
};

export default FormModal;
