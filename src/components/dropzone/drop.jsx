import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";

import "./drop.css";

function Dropzone(props) {
    const {onChange, register, setValue} = props
    const [files, setFiles] = React.useState([]);
    const [buffer, setBuffer] = React.useState([]);
    const onDrop = React.useCallback(async function(acceptedFiles) {
        // const imgURL = acceptedFiles.map(async function(x) {
        //                 console.log('here');
        //                 console.log(x);
        //                 // let url = URL.createObjectURL(x);
        //                 // let buffer = await url.arrayBuffer();
        //                 const reader = new FileReader();
        //                 let buffer = await reader.readAsArrayBuffer(x);
        //                 console.log(reader.result);
        //                 return reader.result}
        //                 );

        acceptedFiles.forEach(async function(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const arrayBuffer = reader.result;
                console.log(arrayBuffer);
                buffer.push(arrayBuffer); //not sure why setBuffer doesn't work
                console.log(`buffer : ${buffer}`);

            }
            reader.readAsArrayBuffer(file);
        });

        setFiles(prev => [...prev, ...acceptedFiles]); //Able to retrieve previous state
        console.log("file accepted");
    }, []);
    const { getRootProps, getInputProps } = useDropzone({onDrop, multiple:true, accept: 'image/*'});

    useEffect(() => {
        register({name: 'images'});
    }, [])

    useEffect(() => {
        setValue("images", buffer); 
        console.log("set value");
    }, [buffer])

    const fileList = files.map(file => (
    <li key={file.path}>
        {file.path} - {file.size} bytes
    </li>
    ));



    return (
    <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
        <ul>{fileList}</ul>
        </aside>
    </section>
    );
    }

export default Dropzone;