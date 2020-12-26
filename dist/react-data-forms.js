function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from "react";
import Input from "./Elements/Input";
import RadioGroup from "./Elements/RadioGroup";
import Dropdown from "./Elements/Dropdown";
import DateType from "./Elements/DateType";

const DataForm = ({
  fieldsData,
  onChange,
  form
}) => {
  const [onFieldset, setOnFieldset] = useState(0);
  const elementTypes = {
    Input: Input,
    RadioGroup: RadioGroup,
    Dropdown: Dropdown,
    DateType: DateType
  };

  const createFieldSet = (data, idx, length) => /*#__PURE__*/React.createElement("fieldset", {
    key: idx,
    className: idx === onFieldset ? 'open' : 'closed'
  }, /*#__PURE__*/React.createElement("legend", null, data.title, onFieldset !== idx && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx)
  }, "Show Section")), /*#__PURE__*/React.createElement("details", {
    open: idx === onFieldset ? true : false
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      display: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "form-element-group"
  }, data.fields.map(d => {
    const E = elementTypes[d.type] || elementTypes.Input;
    return /*#__PURE__*/React.createElement(E, _extends({
      key: d.name
    }, d, {
      onChange: onChange,
      value: form[d.name]
    }));
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-navigation"
  }, idx !== 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx - 1)
  }, "Prev"), idx !== length - 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setOnFieldset(idx + 1)
  }, "Next"))));

  return /*#__PURE__*/React.createElement("div", {
    className: "data-form"
  }, fieldsData.map((f, idx, arr) => createFieldSet(f, idx, arr.length)));
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