function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import uppercase from "../helpers/uppercase";

const Range = ({
  name,
  title,
  value,
  onChange,
  type = "text",
  options = {}
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "form-element-range"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, uppercase(title)), /*#__PURE__*/React.createElement("div", {
    className: "range-input-values"
  }, /*#__PURE__*/React.createElement("span", null, options.min || 0), /*#__PURE__*/React.createElement("input", _extends({
    name: name,
    onChange: onChange,
    value: value || options.min,
    type: type
  }, options)), /*#__PURE__*/React.createElement("span", null, options.max || 100)), /*#__PURE__*/React.createElement("div", {
    className: "range-value"
  }, value || options.min));
};

export default Range;