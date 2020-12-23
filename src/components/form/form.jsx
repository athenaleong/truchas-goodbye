import React, {useEffect , useState} from 'react';
import { Controller, useForm, useFormContext } from "react-hook-form";
import Select from "react-select";
import ErrorBoundary from '../errorBoundary/errorBoundary'
import Dropzone from '../dropzone/drop';
import { MarkerForm, TitleInput, DescriptionInput, SelectStyled, FormText, FirstDiv, Input} from './style';
import EmojiPicker from '../emojiPicker/emojiPicker';

const axios = require('axios');
var FormData = require('form-data');

 function Form(props) {
    const {lat, lng, setModalShow, allUser, setSelectedTagId, setDrawerShow} = props;

    const {register, handleSubmit, control, setValue, formState}  = useForm({mode: 'onChange', reValidateMode: 'onChange'});

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
            <FirstDiv>
                <Controller
                    name="emoji"
                    control={control}
                    render={() => <EmojiPicker register={register} setValue={setValue}></EmojiPicker>}
                />
                <TitleInput name="title" placeholder="Title" ref={register({required : true})} />
            </FirstDiv>

            <DescriptionInput name="description" placeholder="Description" minRows={4} ref={register} />
            <Controller
                name="people"
                as={SelectStyled}
                isMulti
                options={[{value:'all', label:'all users'}, ...allUser]} //TODO: implement select all 
                control={control}
                defaultValue={null}
                classNamePrefix={'Select'}
            />

            <FormText>Album</FormText>
            
            <Controller
                name="images"
                control={control}
                render={(onChange) =>
                    <Dropzone onChange={onChange} register={register} setValue={setValue}></Dropzone>
                }
            
            />

            <Input type="submit" className={formState.isValid? 'submit' : null} />
        </MarkerForm>
    );
}

export default Form



{/* 
            /> */}