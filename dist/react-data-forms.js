function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from "react";
import Input from "./Elements/Input";
import RadioGroup from "./Elements/RadioGroup";
import Dropdown from "./Elements/Dropdown";
import DateType from "./Elements/DateType";

const DataForm = ({
  fieldsData,
  onChange,
  form,
  onSubmit = null,
  submitText = ""
}) => {
  //This makes a single array of all of the items in the form.
  const justFields = fieldsData.flatMap(fs => fs.fields.map(f => f));
  const [validationErrors, setValidationErrors] = useState([]);
  const [onFieldset, setOnFieldset] = useState(0);
  const elementTypes = {
    Input: Input,
    RadioGroup: RadioGroup,
    Dropdown: Dropdown,
    DateType: DateType
  }; //handle validation here

  const formSubmitted = async () => {
    //validate first!
    //these are the ones that need to be validated
    let validateList = justFields.filter(f => f.validate); //for now just dealing with notNull

    let errors = validateList.map(f => f.validate === 'not-null' && !form[f.name] ? {
      name: f.name,
      error: 'Empty Value Not Allowed'
    } : null).filter(f => f); //TODO Additional validators.
    //IF there are errors this will not allow it to be sent

    if (errors.length > 0) return setValidationErrors(errors); //do the submission. If an error is returned add the error here.

    errors = await onSubmit(form);
    if (!errors) return;
    if (errors.length > 0) return setValidationErrors(errors);
  }; //TODO 


  const createFieldSet = (data, idx, length) => /*#__PURE__*/React.createElement("fieldset", {
    key: idx,
    className: idx === onFieldset ? 'open' : 'closed'
  }, /*#__PURE__*/React.createElement("legend", null, onFieldset !== idx && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx)
  }, data.title), onFieldset === idx && data.title), /*#__PURE__*/React.createElement("details", {
    open: idx === onFieldset ? true : false
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-element-group"
  }, data.fields.map(d => {
    const E = elementTypes[d.type] || elementTypes.Input;
    const error = validationErrors.find(e => e.name === d.name);
    return /*#__PURE__*/React.createElement("div", {
      key: d.name
    }, /*#__PURE__*/React.createElement(E, _extends({}, d, {
      onChange: onChange,
      value: form[d.name]
    })), error && /*#__PURE__*/React.createElement("div", {
      className: "data-form-error"
    }, " ^ ", d.title, " : ", error.error));
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-navigation"
  }, idx !== 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx - 1)
  }, "Prev"), idx !== length - 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx + 1)
  }, "Next")))); //if the error name is found, the error message will show up near that form item.
  //otherwise it will be a general for error.


  const showErrors = () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "data-form-error"
  }, "There are Errors."), validationErrors.filter(e => !justFields.find(f => e.name === f.name)).map((e, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "data-form-error"
  }, e.name, ": ", e.error)));

  return /*#__PURE__*/React.createElement("div", {
    className: "data-form"
  }, validationErrors && validationErrors.length > 0 && showErrors(), fieldsData.map((f, idx, arr) => createFieldSet(f, idx, arr.length)), onSubmit && /*#__PURE__*/React.createElement("button", {
    onClick: formSubmitted,
    className: "data-form-submit"
  }, submitText));
};

export const useDataForm = formData => {
  const [form, setForm] = useState(formData || {});

  const updateForm = ({
    target: {
      value,
      name
    }
  }) => setForm({ ...form,
    [name]: value
  });

  return {
    form,
    updateForm,
    DataForm
  };
};