import React, {useState} from "react";
import Input from "./Elements/Input";
import RadioGroup from "./Elements/RadioGroup";
import Dropdown from "./Elements/Dropdown";
import DateType from "./Elements/DateType";
const DataForm = ({fieldsData, onChange, form, onSubmit=null, submitText=""}) => {
    
    //This makes a single array of all of the items in the form.
    const justFields = fieldsData.flatMap(fs=>fs.fields.map(f=>f));

    const [validationErrors, setValidationErrors] = useState([]);

    const [onFieldset, setOnFieldset] = useState(0);
    const elementTypes = {
        Input:Input,
        RadioGroup:RadioGroup,
        Dropdown:Dropdown,
        DateType:DateType
    }

    //handle validation here
    const formSubmitted = async () =>{ 
        //validate first!

        //these are the ones that need to be validated
        let validateList = justFields.filter(f=>f.validate);

        //for now just dealing with notNull
        let errors = validateList.map(f=>(f.validate === 'not-null' && !form[f.name]) ? {name:f.name, error:'Empty Value Not Allowed'} :null).filter(f=>f)
        //TODO Additional validators.


        //IF there are errors this will not allow it to be sent
        if(errors.length > 0) return setValidationErrors(errors);

        //do the submission. If an error is returned add the error here.
        errors = await onSubmit(form);
        if(!errors) return;
        if(errors.length > 0) return setValidationErrors(errors);
    };

    //TODO 
    const createFieldSet = (data,idx, length)=>(
        <fieldset key={idx} className={idx === onFieldset ? 'open':'closed'}>
            <legend>
                {onFieldset !== idx && <button onClick={()=>setOnFieldset(idx)}>{data.title}</button>}
                {onFieldset === idx && data.title}
            </legend>
            <details open = {idx === onFieldset ? true:false }>
                <summary style={{display:'none'}}></summary>
                <div className='form-element-group'>        
                    {data.fields.map(d=>{
                        const E = elementTypes[d.type] || elementTypes.Input;
                        const error = validationErrors.find(e=>e.name === d.name )
                        return (
                        <div key={d.name} >                            
                            <E {...d} onChange={onChange} value={form[d.name]} />
                            {error && <div className="data-form-error"> ^ {d.title} : {error.error}</div>}
                        </div>
                        )
                    })}
                </div> 
                <div className='form-navigation'>
                    {idx !== 0 && <button onClick={()=>setOnFieldset(idx-1)}>Prev</button>}
                    {idx !== length-1 && <button onClick={()=>setOnFieldset(idx+1)}>Next</button>}
                </div>
            </details>
        </fieldset>
    );

    //if the error name is found, the error message will show up near that form item.
    //otherwise it will be a general for error.
    const showErrors = () => (
        <div>
            <div className='data-form-error'>There are Errors.</div>
        {
            validationErrors
            .filter(e=>!justFields.find(f=>e.name===f.name))
            .map((e,idx)=><div key={idx} className='data-form-error'>{e.name}: {e.error}</div>)
        }
    </div>)

    return (
    <div className='data-form' >
        {(validationErrors && validationErrors.length > 0) && showErrors()}
        {fieldsData.map((f,idx, arr)=>createFieldSet(f,idx, arr.length))}
        {onSubmit && <button onClick={formSubmitted} className='data-form-submit'>{submitText}</button>}
    </div>)
};


export const useDataForm = (formData) => {
    const [form, setForm] = useState(formData || {});
    const updateForm = ({target:{value,name}}) => setForm({...form, [name]:value});
    
    return {form, updateForm, DataForm};
};