var generarIdUnicoFecha = ()=>{
    let fecha = new Date();
    return Math.floor(fecha.getTime()/1000).toString(16);
};
var appSistemaautor = new Vue({
    el: '#appSistemaautor',
    data: {
        forms:{
            'autor':{mostrar:false},
             'lectura':{mostrar:false},
        }
    },
});
document.addEventListener('DOMContentLoaded', e=>{
    let formularios = document.querySelectorAll('.mostrar').forEach(formulario=>{
        formulario.addEventListener('click', evento=>{
            let formulario = evento.target.dataset.form;
            appSistemaautor.forms[formulario].mostrar = true;
        });
    });
});