import React from "react";
import uppercase from "../helpers/uppercase";

const Input = ({
  name,
  title,
  value = "",
  onChange,
  options = {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-element-dropdown"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, uppercase(title)), /*#__PURE__*/React.createElement("select", {
    name: name,
    onChange: onChange,
    value: value
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "-- Please Select From List --"), Object.entries(options).map(([key, value]) => /*#__PURE__*/React.createElement("option", {
    key: key,
    value: key
  }, value))));
};

export default Input;