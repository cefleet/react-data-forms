import React from "react";
import uppercase from "../helpers/uppercase";

const RadioGroup = ({name,title,value = "", onChange,options={}}) => {
    return(
        <div className="form-element radio">
            <label>{uppercase(title)}</label>
            <div className="radio-options">
                {Object.entries(options).map(([key,v],idx)=>(
                    <div key={key} className='radio-option' >
                        <input id={key+idx} checked={value === key} name={name} value={key} type="radio" onChange={onChange} />
                        <label htmlFor={key+idx}>{uppercase(v)}</label>
                    </div>)
                )}
            </div>
        </div>
    )
};

export default RadioGroup;