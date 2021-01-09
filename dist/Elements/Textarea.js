function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import uppercase from "../helpers/uppercase";

const Textarea = ({
  name,
  title,
  value = "",
  onChange,
  options = {},
  placeholder = ""
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-element-textarea"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, uppercase(title)), /*#__PURE__*/React.createElement("textarea", _extends({
    name: name,
    placeholder: placeholder,
    onChange: onChange,
    value: value
  }, options)));
};

export default Textarea;