function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from "react";
import _Input from "./Elements/Input";
import _RadioGroup from "./Elements/RadioGroup";
import _Dropdown from "./Elements/Dropdown";
import _DateType from "./Elements/DateType";

const DataForm = ({
  onChange,
  _updateForm,
  fieldsData,
  _form,
  onSubmit,
  submitText,
  children
}) => {
  const updateForm = ({
    target: {
      value,
      name
    }
  }) => {
    _updateForm(name, value);

    if (typeof onChange !== 'function') return;
    onChange(name, value);
  }; //This makes a single array of all of the items in the form.


  const justFields = fieldsData.flatMap(fs => fs.fields.map(f => f)); //This i crazy looking but it looks for the fields to see if there are any default options.
  //if there are it maps them with the default value ..or the current value in the form
  //then it combines that with the form values

  const defaults = justFields.filter(fd => fd.hasOwnProperty('options') && fd.options.hasOwnProperty('default')).map(fd => [fd.name, _form[fd.name] || fd.options.default]).reduce((a, [key, value]) => ({ ...a,
    [key]: value
  }), {}); //apply defaults

  const form = { ...defaults,
    ..._form
  };
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
  }; //Making createElement and CreateFieldset react components with props causes them to re-render and just messes up the world.
  //This just works so don't change it unless you want a headache.


  const createElement = d => {
    const E = elementTypes[d.type] || elementTypes.Input; //defaults to input if there is not a type

    const error = validationErrors.find(e => e.name === d.name);
    return /*#__PURE__*/React.createElement("div", {
      className: "form-element",
      key: d.name
    }, /*#__PURE__*/React.createElement(E, _extends({}, d, {
      onChange: updateForm,
      value: form[d.name] || defaults[d.name]
    })), error && /*#__PURE__*/React.createElement("div", {
      className: "data-form-error"
    }, " ", error.error));
  };

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
  }, data.fields.map(d => createElement(d))), /*#__PURE__*/React.createElement("div", {
    className: "form-navigation"
  }, idx !== 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx - 1)
  }, "Prev"), idx !== length - 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx + 1)
  }, "Next")))); //if the error name is found, the error message will show up near that form item.
  //otherwise it will be a general for error.


  const ShowErrors = () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "data-form-error"
  }, "There are Errors."), validationErrors.filter(e => !justFields.find(f => e.name === f.name)).map((e, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "data-form-error"
  }, e.name, ": ", e.error)));

  return /*#__PURE__*/React.createElement("div", {
    className: "data-form"
  }, validationErrors && validationErrors.length > 0 && /*#__PURE__*/React.createElement(ShowErrors, null), fieldsData.map((f, idx, arr) => createFieldSet(f, idx, arr.length)), children, onSubmit && /*#__PURE__*/React.createElement("button", {
    onClick: formSubmitted,
    className: "data-form-submit"
  }, submitText));
};

export const useDataForm = (formData, fieldsData) => {
  //Such an anitpattern =\ but if I used state it would always refresh the form. 
  //This way the developer can access the current values of the form and adjust as needed.
  let current = {};

  const getCurrentValues = () => current;

  const DataFormHOC = ({
    onChange = null,
    onSubmit = null,
    submitText = "",
    children
  }) => {
    const [_form, setForm] = useState(formData || {});

    const _updateForm = (name, value) => {
      let newValues = { ..._form,
        [name]: value
      };
      setForm(newValues);
      current = { ...newValues
      };
    };

    return /*#__PURE__*/React.createElement(DataForm, {
      onChange,
      fieldsData,
      onSubmit,
      submitText,
      _updateForm,
      _form,
      children
    });
  };

  return {
    DataForm: DataFormHOC,
    getCurrentValues
  };
};
export const Input = _Input;
export const RadioGroup = _RadioGroup;
export const Dropdown = _Dropdown;
export const DateType = _DateType;