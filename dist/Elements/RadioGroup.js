import React from "react";
import uppercase from "../helpers/uppercase";

const RadioGroup = ({
  name,
  title,
  value = "",
  onChange,
  options = {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-element-radio"
  }, /*#__PURE__*/React.createElement("label", null, uppercase(title)), /*#__PURE__*/React.createElement("div", {
    className: "radio-options"
  }, Object.entries(options).map(([key, v], idx) => /*#__PURE__*/React.createElement("div", {
    key: key,
    className: "radio-option"
  }, /*#__PURE__*/React.createElement("input", {
    id: name + key + idx,
    checked: value === key,
    name: name,
    value: key,
    type: "radio",
    onChange: onChange
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: name + key + idx
  }, uppercase(v))))));
};

export default RadioGroup;