# nodejs-puzzle-challenge

Reto de un CRUD usando nodejs express apollo server graphql typeorm

## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

## Pre-requisitos

1.- desde una terminal clonar el siguiete repositorio en tu maquina local

    git clone https://github.com/victrsanchez/nodejs-puzzle-challenge.git

2.- tener instalado mysql en tu maquina local



## Despliegue

Una vez clonado el repositorio ingresa a la carpeta del proyecto

    cd nodejs-puzzle-challenge


Instalar las depencias del proyecto

    npm install apollo-server-express bcryptjs cors dotenv express graphql-resolvers jsonwebtoken mysql2 reflect-metadata typeorm


Construir el proyecto

    npm build


Crear una nueva base de datos en mysql con el nombre deseado

    mysql -u root -p
    create database puzzle;
    exit

Editar el archivo ormconfig.json

    {
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "",
        "database": "puzzle",
        "entities" : ["./dist/database/**/*.js"],
        "synchronize" : true
    }

Y editar cambiar los datos de host, port, username, password y database... dependiendo de como esta configurada la base de datos en tu maquina local

## Ejecución

Una vez construido el proyecto desde la siguiente url se podra acceder

    http://localhost:3003/api

## Pruebas a la api

### Usuarios

Crear nuevo usuario, agregar los valores deseados:

    mutation singUp{
        singUp( input : { name : "", email : "", password : "" } ){
            id
            name
            email
        }
    }

Iniciar sesión con el usuario creado

    mutation login{
        login( input : { email : "", password : "" } ){
            Token
        }
    }

De la consulta anterior copiar el token devuelto como respuesta ya que sera utilizado en las siguientes peticiones

Copiar la siguiente en la sección de headers de la api y sustituir las XXXX por el token devuelto en la consulta anterior

    {
        "Authorization" : "Bearer XXXX"
    }

### Categorías

Para crear nuevas categorias utilizar la siguiente instrucción.

    mutation createCategory{
        createCategory( input : { name : "" } ){
            id
            name
        }
    }

Para actualizar una categoría se debe utilizar la siguiente instrucción, recibiendo como parametros el id de la categoria y el objeto con los atributos a actualizar

    mutation updateCategory{
        updateCategory( id : XXX, input : {name : "", description : "", ingredients : "", categoryId : "" } ){
            id
            name
        }
    }

Para eliminar una categoría existente se debe utilizar la siguiente instruccion, recibiendo como parametro el id de la categoría a eliminar

    mutation deleteCategory{
        deleteCategory( id : XXXX){
            name
        }
    }

Para obtener las categorías existentes, utilizar la siguiente instruccion.

    query getCategories{
        categories{
            id
            name
        }
    }


Para obtener la información de una categoría en especifico se debe utilizar la siguiente expresión, recibiendo como parametro el nombre de la categoría

    query getOneCategory{
        category( name : "" ){
            id
            name
        }
    }


### Recetas

Para obtener todas las recetas exisitentes se debe utilizar la siguiente instrucción
    query getRecipes{
    recipes{
        id
        name
        description
        category{
        name
        }
    }
    }

Para obtener toda la información de una receta en especifico se debe instalar la siguiente intrucción recibiendo como parametro el identificador de la receta.

    query getOneRecipe{
        recipe( id : 2 ){
            id
            name
            description
            category{
            name
            }
        }
    }
 
Para obtener las recetas asociadas al usuario logguedo se debe utilizar la siguiente instrucción

    query getMyRecipes{
        myRecipes{
            name
            description
            ingredients
            category{
            name
            }
        }
    }


Para crear una nueva receta utilizar la siguiente instrucción. asignando los valores deseados

    mutation createRecipe{
        createRecipe( input : 
            { 
                name : "",
                description : "",
                ingredients : "",
                categoryId : ,      
            } 
        ){
            id
            name
            description
            ingredients
            category{
            name
            }
        }
    }


mutation updateRecipe{
  updateRecipe( id : 8, input : 
    { 
      name : "receta actualizada #2", 
      categoryId: 1
    }){
    name
    ingredients
    description
    category{
      name
    }
  }
}

mutation deleteRecipe{
  deleteRecipe( id : 6 ){
    response
  }
}