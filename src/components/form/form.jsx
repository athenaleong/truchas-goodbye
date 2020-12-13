import './form.css';
import React, {useEffect , useState} from 'react';
import { Controller, useForm, useFormContext } from "react-hook-form";
import Select from "react-select";
import ErrorBoundary from '../errorBoundary/errorBoundary'
import Dropzone from '../dropzone/drop'
const axios = require('axios');
var FormData = require('form-data');

 function Form(props) {
    const {lat, lng, setModalShow, allUser} = props;

    const {register, handleSubmit, control, setValue}  = useForm();

    const onSubmit = async (data) => {

        const images = data.images;
        let imgId = [];
        if (images.length != 0) {
            let formData = new FormData();
            images.forEach((img) => {
                formData.append('img', img);
            })


            let config = {
                method: 'post',
                url: 'http://localhost:5555/uploadImage',
                data : formData
            }

            // TODO: change for production
            let res = await axios(config);
            imgId = res.data.id;  
        } 

        delete data['images'];
        data = {...data, imgId: imgId, lat: lat, lng: lng, category:"Point"};


        console.log(JSON.stringify(data));
        
        let res = await axios.post('http://localhost:5555/uploadPointer', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log(res.data);
        setModalShow(false);
    };
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input name="title" ref={register({required: true, maxLength:10})} />
            <textarea name="description" ref={register({required: true, maxLength:30})} />
            <div>
                <input name="icon" type="radio" value="1" ref={register({required: true, max:1})}/>
                <input name="icon" type="radio" value="2" ref={register({required: true, max:1})} />
                <input name="icon" type="radio" value="3" ref={register({required: true, max:1})} />
                <input name="icon" type="radio" value="4" ref={register({required: true, max:1})} />
            </div>
            <Controller
                name="people"
                as={Select}
                isMulti
                options={[{value:'all', label:'all users'}, ...allUser]} //TODO: implement select all 
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

