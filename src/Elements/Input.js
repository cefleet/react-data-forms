import React from "react";
import uppercase from "../helpers/uppercase";

const Input = ({name,title,value = "", onChange, type="text", options={}, placeholder=""}) => {
    return(
        <div className="form-element-input">
            <label htmlFor={name}>{uppercase(title)}</label>
            <input 
                name={name} 
                placeholder={placeholder} 
                onChange={onChange} 
                value={value}
                type={type}
                {...options}
            />
        </div>
    )
};

export default Input;