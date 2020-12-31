import React from "react";
import uppercase from "../helpers/uppercase";

const Range = ({name,title,value, onChange, type="text", options={}}) => {
    return(
        <div className="form-element-range">
            <label htmlFor={name}>{uppercase(title)}</label>
            <div className='range-input-values'>
                <span>{options.min || 0}</span>
                <input 
                    name={name} 
                    onChange={onChange} 
                    value={value || options.min}
                    type={type}
                    {...options}
                />
                <span>{options.max || 100}</span>
            </div>
            <div className='range-value'>{value || options.min}</div>
        </div>
    )
};

export default Range;