Vue.component('autor',{
    data:()=>{
        return {
            buscar:'',
            autor:[],
            autor:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idCliente : '',
                codigo: '',
                nombre: '',
                direccion: '',
                telefono: '',
                dui: ''
            }
        }
    },
    methods:{
        buscandoCliente(){
            this.obtenerLibros(this.buscar);
        },
        eliminarCliente(autor){
            if( confirm(`Esta seguro de eliminar el autor ${autor.nombre}?`) ){
                this.autor.accion = 'eliminar';
                this.autor.idCliente = autor.idCliente;
                this.guardarCliente();
            }
            this.nuevoCliente();
        },
        modificarCliente(datos){
            this.autor = JSON.parse(JSON.stringify(datos));
            this.autor.accion = 'modificar';
        },
        guardarCliente(){
            this.obtenerLibros();
            let autor = JSON.parse(localStorage.getItem('autor')) || [];
            if(this.autor.accion=="nuevo"){
                this.autor.idCliente = generarIdUnicoFecha();
                autor.push(this.autor);
            } else if(this.autor.accion=="modificar"){
                let index = autor.findIndex(autor=>autor.idCliente==this.autor.idCliente);
                autor[index] = this.autor;
            } else if( this.autor.accion=="eliminar" ){
                let index = autor.findIndex(autor=>autor.idCliente==this.autor.idCliente);
                autor.splice(index,1);
            }
            localStorage.setItem('autor', JSON.stringify(autor));
            this.nuevoCliente();
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
            this.autor.idCliente = '';
            this.autor.codigo = '';
            this.autor.nombre = '';
            this.autor.direccion = '';
            this.autor.telefono = '';
            this.autor.dui = '';
        }
    },
    created(){
        this.obtenerLibros();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carCliente">
                <div class="card-header bg-primary">
                    Registro de Libros

                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carCliente" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarCliente" @reset="nuevoCliente">
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
                            <div class="col col-md-2">Direccion:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la direccion" v-model="autor.direccion" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Telefono:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el tel" v-model="autor.telefono" pattern="[0-9]{4}-[0-9]{4}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">DUI:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el DUI" v-model="autor.dui" pattern="[0-9]{8}-[0-9]{1}" required type="text" class="form-control">
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
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarCliente">
                <div class="card-header bg-primary">
                    Busqueda de Libros

                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarCliente" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoCliente" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>DIRECCION</th>
                                <th>TEL</th>
                                <th>DUI</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in autor" @click='modificarCliente( item )' :key="item.idCliente">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.direccion}}</td>
                                <td>{{item.telefono}}</td>
                                <td>{{item.dui}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarCliente(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});