import moment from "moment/moment";
moment.locale('es');
export const date =  () => {
    const fecha = new Date();
    const fechaStr = fecha.getFullYear();
    return fechaStr; 
}

export const diffForHumans = (dateTimes) => {
    moment.locale('es')
    const fechaMoment = moment(dateTimes);
    const fechaFormateada = fechaMoment.fromNow(); // "hace 1 día"
    return fechaFormateada; 
}

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const choice = (textSingular, textPlural, number ) => {
    if(number === 1){
        return textSingular
    }else if(number > 2 || number === 0){
        return textPlural
    }
}
  