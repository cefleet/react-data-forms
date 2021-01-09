# React Data Forms

Using React hooks, create forms for react using js objects.

## Sample Usage

```js

//fields.js
//Could also be a generated object from a datasource.
const fields = 
[{
    title:"First Section",
    fields:[{
        title:'Favorite Animal',
        name:'favorite_animal', 
        validate:'not-null'
    },           
    {import {useDataForm} from "react-data-forms";

        type:'RadioGroup', 
        title:'Favorite Color', 
        name:'favorite_color', 
        options:{
            red:"Red",
            blue:"Blue",
            green:"Green"
        }
    }]
},{
    title:"Second Section",
    fields:[{
        title:'Number of Hated Animals', 
        name:'hated_count', 
        type:"Range", 
        options:{
            min:0, 
            max:10
        }
    },           
    {
        type:'Dropdown', 
        title:'Hated Color', 
        name:'hated_color', 
        options:{
            red:"Red",
            blue:"Blue",
            green:"Green"
        }
    }]
}];
```
```js
import {useDataForm} from "react-data-forms";
import {fields} from "./fields";
//Create a form without any data
export const CreateForm = () => {
    const {DataForm} = useDataForm(fields);

    const onSubmit = (dataFromForm) => {
        console.log(dataFromForm);
        //do something with the form entries
    };

    return <DataForm onSubmit={onSubmit} submitText={'Create Data'} />
};
```
```js
//Can be retrieved from a database
const data = {
    favorite_animal:'Kitties',
    favorite_color:'green',
    hated_count:3,
    hated_color:'blue'
}
```
```js
import {useDataForm} from "react-data-forms";
import {fields} from "./fields";

//creating a form with data
export const EditForm = () => {
    const {DataForm} = useDataForm(fields,data);

    const onSubmit = (dataFromForm) => {
        console.log(dataFromForm);
        //do something with the form entries
    };

    return <DataForm onSubmit={onSubmit} submitText={'Edit Data'} />
};
```