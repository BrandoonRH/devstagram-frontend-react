import Dropzone from "dropzone";
Dropzone.autoDiscover = false; 

const dropzone = new Dropzone('#dropzone', {
    dictDefaultMessage: "Sube tu Imagen Aquí", 
    acceptedFiles: ".png,.jpg,.jpeg,.gif",
    addRemoveFile: "Borrar Archivo",
    maxFiles: 1,
    uploadMultiple: false
});

