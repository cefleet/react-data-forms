import React from "react";
import uppercase from "../helpers/uppercase";

const DateType = ({name,title,value, onChange, options={}}) => {
    const type = options.type || 'date';

    const toTimeStamp = ({target:{value}}) => {
        onChange({target:{value:new Date(value).getTime(), name:name}})
    }

    const fromTimeStamp = (timestamp) => {
        if(type === 'datetime-local') return new Date(Number(timestamp)).toISOString().slice(0,-8);
        return new Date(Number(timestamp)).toISOString().split('T')[0];
    };

   return(
        <div className="form-element date">
            <label htmlFor={name}>{uppercase(title)}</label>
            <input 
                name={name} 
                onChange={toTimeStamp} 
                value={value ? fromTimeStamp(value) : ""}
                type={type}
                {...options}
            />
        </div>
    )
};

export default DateType;