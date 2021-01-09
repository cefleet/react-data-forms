import React from "react";
import uppercase from "../helpers/uppercase";

const Textarea = ({name,title,value = "", onChange, options={}, placeholder=""}) => {
    return(
        <div className="form-element-textarea">
            <label htmlFor={name}>{uppercase(title)}</label>
            <textarea
                name={name} 
                placeholder={placeholder} 
                onChange={onChange} 
                value={value}
                {...options}
            >
            </textarea>
        </div>
    )
};

export default Textarea;