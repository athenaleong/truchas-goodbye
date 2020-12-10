import './form.css';
import React from 'react';
import { Controller, useForm, useFormContext } from "react-hook-form";
import Select from "react-select";
import ErrorBoundary from '../errorBoundary/errorBoundary'
import Dropzone from '../dropzone/drop'
import client from '../../mongo'


function Form(props) {

    const {register, handleSubmit, control, setValue} = useForm();
    const onSubmit = (data) => {
        // alert(JSON.stringify(data))
        images = data['img'];
        alert(images)
        db.connect(err => {
            const imageDb = client.db("truchas").collection("image");
            console.log("connected to db");
            client.close();
        })
    };



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="title" ref={register({required: true, maxLength:10})} />
            <textarea name="description" ref={register({required: true, maxLength:30})} />

            <input name="icon" type="radio" value="1" ref={register({required: true, max:1})}/>
            <input name="icon" type="radio" value="2" ref={register({required: true, max:1})} />
            <input name="icon" type="radio" value="3" ref={register({required: true, max:1})} />
            <input name="icon" type="radio" value="4" ref={register({required: true, max:1})} />

            <Controller
                name="people"
                as={Select}
                isMulti
                options={[
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" }]}
                control={control}
                rules={{required:true}}
                defaultValue={null}
            />

            <Controller
                name="images"
                control={control}
                render={(onChange) =>
                    <Dropzone onChange={onChange} register={register} setValue={setValue}></Dropzone>
                }
            
            />

            <input type="submit" />
        </form>
    );
}

export default Form


// import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function App() {
//   const { register, handleSubmit, errors } = useForm();
//   const onSubmit = data => console.log(data);
//   console.log(errors);
  
//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input type="text" placeholder="Title" name="Title" ref={register({required: true})} />
//       <select name="icon" ref={register({ required: true })}>
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//       </select>
//       <input type="text" placeholder="Description" name="Description" ref={register({required: true, maxLength: 30, pattern: /^\S+@\S+$/i})} />
//       <select name="people" ref={register}>
//         <option value="a">a</option>
//         <option value="b">b</option>
//         <option value="c">c</option>
//         <option value="d">d</option>
//         <option value="e">e</option>
//         <option value="f">f</option>
//         <option value="g">g</option>
//       </select>

//       <input type="submit" />
//     </form>
//   );
// }