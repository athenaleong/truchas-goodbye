import React, {useEffect , useState} from 'react';
import { Controller, useForm, useFormContext } from "react-hook-form";
import Select from "react-select";
import ErrorBoundary from '../errorBoundary/errorBoundary'
import Dropzone from '../dropzone/drop';
import { MarkerForm, TitleInput, DescriptionInput, EmojiInput} from './style';
import EmojiPicker from '../emojiPicker/emojiPicker';

const axios = require('axios');
var FormData = require('form-data');

 function Form(props) {
    const {lat, lng, setModalShow, allUser, setSelectedTagId, setDrawerShow} = props;

    const {register, handleSubmit, control, setValue}  = useForm();
    const {pickerShow, setPickerShow} = useState(false);

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
        
        let res = await axios.post('http://localhost:5555/uploadPointer', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        setModalShow(false);
        setSelectedTagId(res.data);
        setDrawerShow(true);
    };

    const divStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: 100 + '%'
    };


    return (
        <MarkerForm onSubmit={handleSubmit(onSubmit)}>
            <div style={divStyle}>
            <Controller
                name="emoji"
                control={control}
                render={() => <EmojiPicker register={register} setValue={setValue}></EmojiPicker>}
            />
            <TitleInput name="title" ref={register} />
            </div>
            <DescriptionInput name="description" ref={register} />
            
            
            
            <Controller
                name="images"
                control={control}
                render={(onChange) =>
                    <Dropzone onChange={onChange} register={register} setValue={setValue}></Dropzone>
                }
            
            />

            <input type="submit" />
        </MarkerForm>
    );
}

export default Form



{/* 
            /> */}