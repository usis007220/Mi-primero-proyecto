autor.js
Vue.component('autor',{
    data:()=>{
        return {
            buscar:'',
            autor:[],
            autor:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idautor : '',
                codigo: '',
                nombre: '',
              
                pais: '',
                telefono:'',
              
            }
        }
    },
    methods:{
        buscandoautor(){
            this.obtenerautor(this.buscar);
        },
        eliminarautor(autor){
            if( confirm(`Esta seguro de eliminar el autor ${autor.nombre}?`) ){
                this.autor.accion = 'eliminar';
                this.autor.idautor = autor.idautor;
                this.guardarautor();
            }
            this.nuevoautor();
        },
        modificarautor(datos){
            this.autor = JSON.parse(JSON.stringify(datos));
            this.autor.accion = 'modificar';
        },
        guardarautor(){
            this.obtenerautor();
            let autor = JSON.parse(localStorage.getItem('autor')) || [];
            if(this.autor.accion=="nuevo"){
                this.autor.idautor = generarIdUnicoFecha();
                autor.push(this.autor);
            } else if(this.autor.accion=="modificar"){
                let index = autor.findIndex(autor=>autor.idautor==this.autor.idautor);
                autor[index] = this.autor;
            } else if( this.autor.accion=="eliminar" ){
                let index = autor.findIndex(autor=>autor.idautor==this.autor.idautor);
                autor.splice(index,1);
            }
            localStorage.setItem('autor', JSON.stringify(autor));
            this.nuevoautor();
            this.obtenerLibros();
            this.autor.msg = 'autor procesado con exito';
        },
        obtenerLibros(valor=''){
            this.autor = [];
            let autor = JSON.parse(localStorage.getItem('autor')) || [];
            this.autor = autor.filter(autor=>autor.nombre.toLowerCase().indexOf(valor.toLowerCase())>-1);
        },
        nuevoCliente(){
            this.autor.accion = 'nuevo';
            this.autor.msg = '';
            this.autor.idautor = '';
            this.autor.codigo = '';
            this.autor.nombre = '';
            this.autor.pais = '';
          
        
            this.autor.telefono = '';
        }
    },
    created(){
        this.obtenerautor();
    },
    template:`
        <div id="appSistemaautor">
            <div class="card text-white" id="carautor">
                <div class="card text-white bg-success">
                    Registro de Libros

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carautor" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarautor" @reset="nuevoautor">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="autor.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre" v-model="autor.nombre" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1"> 
                            <div class="col col-md-2">Pais:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el pais" v-model="autor.pais" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                            </div>
                        </div>
                      
                  
                </div>
                <div class="row p-1">
                <div class="col col-md-2">Telefono:</div>
                <div class="col col-md-2">
                    <input title="Ingrese el telefono" type='date' v-model="autor.telefono" required type="text" class="form-control">
                </div>
            </div>
                       
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="autor.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ autor.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-secondary" style="border-radius: 30px;"  type="submit"  value="Guardar">
                                <input class="btn btn-info" style="border-radius: 30px; color: white;"  type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white bg-success" id="carBuscarautor">
                <div class="card text-white bg-success">
                    Busqueda de autores

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarautor" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoautor" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>PAIS</th>

                                <th>TELEFONO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in autor" @click='modificarautor( item )' :key="item.idautor">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.pais}}</td>
                                
                                <td>{{item.telefono}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarautor(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});