import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
import {DropContainer, DropInner, UploadedMedia, MediaBox, MediaRow, AlbumBox, UploadText, IconStyled, IconBubble} from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Dropzone(props) {
    const {onChange, register, setValue} = props
    const [files, setFiles] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const onDrop = React.useCallback(async function(acceptedFiles) {

        acceptedFiles.forEach(async function(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                console.log(`file type ${typeof file}`);
                const base64 = reader.result;

                setBuffer(prev => [...prev, base64]);
                setFiles(prev => [...prev, file]);
                // console.log(`buffer: ${buffer}`);

            }
            // reader.readAsArrayBuffer(file);
            reader.readAsDataURL(file);

        });

        // setFiles(prev => [...prev, ...acceptedFiles]); //Able to retrieve previous state
        console.log("file accepted");
    }, []);
    const { getRootProps, getInputProps } = useDropzone({onDrop, multiple:true, accept: 'image/*'});

    useEffect(() => {
        register({name: 'images'});
    }, [])

    useEffect(() => {
        console.log(`files ${files}`)
        setValue("images", files); 
        console.log("set value");
    }, [files])

    const removeMedia = (index) => {
        console.log(`remove ${index}`)
        setFiles(prev => [...prev.slice(0,index), ...prev.slice(index+1)]);
        setBuffer(prev => [...prev.slice(0,index), ...prev.slice(index+1)]);
    }

    const bufferList = buffer.map((b, index) => (
        <MediaBox>
            <IconBubble>
                <IconStyled icon={faTimes} onClick={() => removeMedia(index)}/>
            </IconBubble>
            <UploadedMedia key={b} src={b}/>
        </MediaBox>
    ));

    function media() {
        var toReturn = [];
        for (var i = 0, j = bufferList.length; i < j ; i += 3) {
            toReturn.push(
                <MediaRow>
                    {bufferList.slice(i, i+3)}
                </MediaRow>
            )
        }
        return toReturn;

    }

    return (
    <DropContainer> 
        <DropInner {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <UploadText>Upload Media</UploadText>
        </DropInner>
        {buffer.length != 0 &&
        <AlbumBox>
            {media()}
        </AlbumBox>
        }
    </DropContainer>
    );
    }

export default Dropzone;