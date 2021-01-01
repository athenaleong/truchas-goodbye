import React, {useEffect , useState} from 'react';
import { Controller, useForm, useFormContext } from "react-hook-form";
import ErrorBoundary from '../errorBoundary/errorBoundary'
import Dropzone from '../dropzone/drop';
import { MarkerForm, TitleInput, DescriptionInput, SelectStyled, FormText, FirstDiv, Input} from './style';
import EmojiPicker from '../emojiPicker/emojiPicker';
import SelectUser from '../select/select';

const axios = require('axios');
var FormData = require('form-data');

 function Form(props) {
    const {lat, lng, setModalShow, allUser, setSelectedTagId, setDrawerShow, editPointerId, setEditPointerId} = props;

    const {imgURL, imgId, emoji, description, _id, title, people} = editPointerId || {};
    
    const {register, handleSubmit, control, setValue, formState}  = useForm({mode: 'onChange', reValidateMode: 'onChange'});

    console.log(imgId);

    const onSubmit = async (data) => {
        const images = data.images;
        let newImgId = [];
        const existingImages = images.filter(img => typeof img == 'string');
        const newImages = images.filter(img => typeof img != 'string');

        console.log(`exisiting Id : ${existingImages}`);
        console.log(`new Id : ${newImages}`);

        if (newImages.length != 0) {
            let formData = new FormData();
            newImages.forEach((img) => {
                formData.append('img', img);
            })

            let config = {
                method: 'post',
                url: '/uploadImage',
                data : formData
            }

            let res = await axios(config);
            newImgId = res.data.id;  
        } 

        delete data['images'];

        let res;
        if (_id) {
            const deletedImages = imgId.filter(id => !existingImages.includes(id));

            if (deletedImages.length != 0) {
                console.log(`deleted images length ${deletedImages.length}`)
                let json = {'imgId' : deletedImages}

                await axios.post('/deleteImage', json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            data = {...data, id: _id, imgId: [...existingImages, ...newImgId]};

            res = await axios.post('/updatePointer', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            setSelectedTagId(null);
            setSelectedTagId(_id);
        }  
        else {
            data = {...data, imgId: newImgId, lat: lat, lng: lng, category:"Point"};
            res = await axios.post('/uploadPointer', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setSelectedTagId(res.data);
        }
        setModalShow(false);
        setDrawerShow(true);
        setEditPointerId(null);
    }
    

    const divStyle = {
        display: 'flex',
        flexDirection: 'row',
        width: 100 + '%'
    };

    const handleChange = ([selectedOption]) => {
        console.log('change happened');
        console.log(selectedOption);
    }

    return (
        <MarkerForm onSubmit={handleSubmit(onSubmit)}>
            <FirstDiv>
                <Controller
                    name="emoji"
                    control={control}
                    render={() => <EmojiPicker register={register} setValue={setValue} defaultValue={emoji}></EmojiPicker>}
                />
                <TitleInput name="title" placeholder="Title" ref={register({required : true})} defaultValue={title}/>
            </FirstDiv>

            <DescriptionInput name="description" placeholder="Description" minRows={4} ref={register} defaultValue={description} />

            <Controller
                name="people"
                control={control}
                render={() =>
                    <SelectUser register={register} setValue={setValue} allUser={allUser} defaultValue={people}></SelectUser>
                }   
            /> 
            <Controller
                name="images"
                control={control}
                render={(onChange) =>
                    <Dropzone onChange={onChange} register={register} setValue={setValue} imgURL={imgURL} imgId={imgId}></Dropzone>
                }
            />

            <Input type="submit" className={formState.isValid? 'submit' : null} />
        </MarkerForm>
    );
}

export default Form


