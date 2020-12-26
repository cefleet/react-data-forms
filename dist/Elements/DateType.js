function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from "react";
import uppercase from "../helpers/uppercase";

const DateType = ({
  name,
  title,
  value,
  onChange,
  options = {}
}) => {
  const type = options.type || 'date';

  const toTimeStamp = ({
    target: {
      value
    }
  }) => {
    onChange({
      target: {
        value: new Date(value).getTime(),
        name: name
      }
    });
  };

  const fromTimeStamp = timestamp => {
    if (type === 'datetime-local') return new Date(Number(timestamp)).toISOString().slice(0, -8);
    return new Date(Number(timestamp)).toISOString().split('T')[0];
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "form-element date"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name
  }, uppercase(title)), /*#__PURE__*/React.createElement("input", _extends({
    name: name,
    onChange: toTimeStamp,
    value: value ? fromTimeStamp(value) : "",
    type: type
  }, options)));
};

export default DateType;