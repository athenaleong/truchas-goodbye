import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";
import {DropContainer} from './style';

function Dropzone(props) {
    const {onChange, register, setValue} = props
    const [files, setFiles] = React.useState([]);
    const [buffer, setBuffer] = React.useState([]);
    const onDrop = React.useCallback(async function(acceptedFiles) {

        acceptedFiles.forEach(async function(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                console.log(`file type ${typeof file}`);
                const base64 = reader.result;
                buffer.push(base64);
                files.push(file);
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

    const fileList = files.map(file => (
    <li key={file.path}>
        {file.path} - {file.size} bytes
    </li>
    ));



    return (
    <DropContainer>
        <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
        <ul>{fileList}</ul>
        </aside>
    </DropContainer>
    );
    }

export default Dropzone;