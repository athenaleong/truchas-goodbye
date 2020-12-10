import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useDropzone } from "react-dropzone";

import "./drop.css";

function Dropzone(props) {
    const {onChange, register, setValue} = props
    const [files, setFiles] = React.useState([]);
    const [url, setURL] = React.useState([]);
    const onDrop = React.useCallback(acceptedFiles => {
        const imgURL = acceptedFiles.map(x => {
                        console.log(x);
                        let url = URL.createObjectURL(x);
                        console.log(url);
                        return url}
                        );
        console.log(imgURL);
        setURL(prev => [...prev, ...imgURL]); //Able to retrieve previous state
        setFiles(prev => [...prev, ...acceptedFiles]); //Able to retrieve previous state


        console.log("file accepted")
    }, []);
    const { getRootProps, getInputProps } = useDropzone({onDrop, multiple:true, accept: 'image/*'});

    useEffect(() => {
        register({name: 'images'});
    }, [])

    useEffect(() => {
        setValue("images", url);
        console.log("set value");
    }, [url])

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