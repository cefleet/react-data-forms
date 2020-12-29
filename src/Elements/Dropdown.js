import React from "react";
import uppercase from "../helpers/uppercase";

const Input = ({name,title,value = "", onChange,options={}}) => {
    return(
        <div className="form-element-dropdown">
            <label htmlFor={name}>{uppercase(title)}</label>
            <select
                name={name} 
                onChange={onChange} 
                value={value}
            >
            <option value="">-- Please Select From List --</option>
            {Object.entries(options).map(([key,value])=><option key={key} value={key}>{value}</option>)}
            </select>
        </div>
    )
};

export default Input;