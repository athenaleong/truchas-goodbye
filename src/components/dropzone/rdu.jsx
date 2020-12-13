import React from 'react';
import {Dropzone} from 'react-dropzone-uploader';
import './rdu.css';

function Standard(props) {
    console.log('loading standard')
    const {onChange} = props
    const getUploadParams = () => {
      return { url: 'https://httpbin.org/post' }
    }
  
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={onChange}
        // onSubmit={handleSubmit}
        styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
      />
    )
}

  export default Standard
  
