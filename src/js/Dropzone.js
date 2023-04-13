import Dropzone from "dropzone";

Dropzone.autoDiscover = false

const dropzone = new Dropzone("#dropzone", {
    dictDefaultMessage: 'Sube tu Imagen aquí',
    acceptedFiles: '.png,.jpg,.jpeg,.gif',
    addRemoveLinks: true,
    dictRemoveFile: "Borrar Archivo",
    maxFiles: 1,
    uploadMultiple: false
});