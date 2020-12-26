import React, {useState} from "react";
import Input from "./Elements/Input";
import RadioGroup from "./Elements/RadioGroup";
import Dropdown from "./Elements/Dropdown";
import DateType from "./Elements/DateType";
const DataForm = ({fieldsData, onChange, form}) => {
    const [onFieldset, setOnFieldset] = useState(0);
    const elementTypes = {
        Input:Input,
        RadioGroup:RadioGroup,
        Dropdown:Dropdown,
        DateType:DateType
    }

    const createFieldSet = (data,idx, length)=>(
        <fieldset key={idx} className={idx === onFieldset ? 'open':'closed'}>
            <legend>
                {data.title}{onFieldset !== idx && <button onClick={()=>setOnFieldset(idx)}>Show Section</button>}
            </legend>
            <details open = {idx === onFieldset ? true:false }>
                <summary style={{display:'none'}}></summary>
                <div className='form-element-group'>        
                    {data.fields.map(d=>{
                        const E = elementTypes[d.type] || elementTypes.Input;
                        return (<E key={d.name} {...d} onChange={onChange} value={form[d.name]} />)
                    })}
                </div> 
                <div className='form-navigation'>
                    {idx !== 0 && <button onClick={()=>setOnFieldset(idx-1)}>Prev</button>}
                    {idx !== length-1 && <button onClick={()=>setOnFieldset(idx+1)}>Next</button>}
                </div>
            </details>
        </fieldset>
    );


    return (
    <div className='data-form'>
        {fieldsData.map((f,idx, arr)=>createFieldSet(f,idx, arr.length))}
    </div>)
};


export const useDataForm = (formData) => {
    const [form, setForm] = useState(formData || {});
    const updateForm = ({target:{value,name}}) => setForm({...form, [name]:value});
    
    return {form, updateForm, DataForm};
};