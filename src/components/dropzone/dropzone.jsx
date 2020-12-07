import {React, useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './dropzone.css'



function Dropzone(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const {onChange, register, setValue} = props;
    const onDrop = (acceptedFiles) => {setValue("images", acceptedFiles);console.log('ondropped')};
    const {getRootProps, getInputProps, isDragActive, acceptedFiles, isDragAccept, isDragReject} = useDropzone({accept:'image/*', multiple:true, onDrop}); //multiple true accept image

    // const tester = () => {
    //     setValue("test", "123");
    // };
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ));

    useEffect(() => {
        register({name: 'images'});
        console.log(`selectedfile1 : ${selectedFile}`);
        console.log(`acceptedfile1: ${acceptedFiles}`);


    }, []) //Dependant Variable 

    useEffect(() => {
        // {setValue("images", "123")};
        setSelectedFile(acceptedFiles[0]);
        console.log(`selectedfile2 : ${selectedFile}`);
        console.log(`acceptedfile2 : ${acceptedFiles}`);
        acceptedFiles.map(file => console.log(file.path));

        
    }, [acceptedFiles]); //Dependant Variable 

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps({onChange})} /> {
                    isDragActive ?
                    <p>Drop the files here </p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>

                    
                }
            </div>
        <p>{files}</p>
        <button onClick={()=>{setValue('images', '123')}}></button>
        </div>
    )
}

export default Dropzone;
