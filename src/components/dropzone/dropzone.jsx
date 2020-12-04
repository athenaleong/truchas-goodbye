import React from 'react'
import {useDropzone} from 'react-dropzone'

function Dropzone(props) {
    console.log(props);
    const {onChange, hand} = props;
    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept:'image/*', multiple:true});

    return (
        <div {...getRootProps()}>
            <input {...getInputProps({onChange})} /> {
                isDragActive ?
                <p>Drop the files here </p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default Dropzone
