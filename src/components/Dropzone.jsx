import React, {useCallback, useState}from 'react';
import {useDropzone} from 'react-dropzone';
import Swal from 'sweetalert2'
import clientAxios from '../config/axios';
import {FiDelete} from "react-icons/fi"
import HoverBox from './HoverBox';
import usePost from '../hooks/usePost';

function MyDropzone(props) {
  const {setImagePost} = usePost();
  const token = localStorage.getItem('AUTH_TOKEN'); 

  const onDrop = useCallback(acceptedFiles => {
   //console.log(acceptedFiles[0]); 
    SendImagetoServer(acceptedFiles[0]); 
  }, [])


  const SendImagetoServer = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await clientAxios.post('/images', formData, {
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
          }
      }); 
      //console.log(response.data.image); 
      setImagePost(response.data.image); 
    } catch (error) {
     console.log(error);
    }
  }

  
  const {acceptedFiles, getRootProps, getInputProps, fileRejections} = useDropzone({
    onDrop, 
    maxFiles:1,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'image/gif': ['.gif'],
    }
  });
  
 const files = acceptedFiles.map(file => (
    <li key={file.path} className='flex justify-between transition-all p-2 hover:bg-gray-400 rounded-md'>
      <p>{file.path} - {file.size} bytes</p>
          <div className="group relative">
            <FiDelete onClick={() => handleRemove(acceptedFiles)} className='cursor-pointer hover:text-black '/>
            <HoverBox text="Eliminar Imagen" />
         </div>
    </li>
  ));

  let hasError = fileRejections.some((element) => {
    return typeof element === 'object' && element.errors !== undefined;
  });

  if (hasError) {
    Swal.fire({
      title: 'Lo sentimos, solo se permite subir una imagen por post',
      confirmButtonText: 'Volver a Intentar',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } 
    }); 
   }

  
  return (
    <section className="container bg-gray-200   w-full  p-11 rounded-md">
      <div {...getRootProps({className: 'dropzone'})} className='bg-gray-300 hover:bg-gray-500 cursor-pointer transition-all hover:-translate-y-2 mb-4 p-10 rounded-md'>
        <input {...getInputProps()} />
        <p className='font-bold text-sm text-white uppercase'>Arrastre y suelte su imagen aquí, o haga clic para seleccionar imagen</p>
      </div>
      <aside className='bg-gray-500 p-5 rounded-md'>
        <h4 className='font-bold text-sm text-white uppercase'>imagen:</h4>
        <ul className='text-sm text-white'>{files}</ul>
      </aside>
    </section>
  );
}


export default MyDropzone; 

