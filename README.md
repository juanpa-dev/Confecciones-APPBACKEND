# Confecciones-APPBACKEND

## Ruta https://confeccionesapp-back.herokuapp.com/api/auth/signup
```json
{
	"username": "",
	"email": "",
	"password": "",
	"roles": [""],
	"enable": ""
}
```
> enable is 1 true or 0 false


## Ruta https://confeccionesapp-back.herokuapp.com/api/auth/signin
```json
{
	"username": "",
	"password": ""
}
```
Insert token in header x-access-token

> https://confeccionesapp-back.herokuapp.com/api/confeccionesapp/admin acceso a admin
####
> https://confeccionesapp-back.herokuapp.com/api/confeccionesapp/user acceso a user 
####
> https://confeccionesapp-back.herokuapp.com/api/confeccionesapp/mod acceso a tercero
####
> https://confeccionesapp-back.herokuapp.com/api/confeccionesapp/all acceso publico


# Modulo compras
Es el modulo encargado del crud de compras y contiene los siguientes metodos

## Create
Se consume con metodo POST enviando en el body el siguente json
```json
{
    "neto":400,
    "fecha": "07/10/1999",
    "userid": 1,
    "almacenid": 1,
    "itemCompra": [
        {
            "precioUnitario": 5,
            "cantidad": 20,
            "precioNeto": 200,
            "productoid": "hola"
        },
        {
            "precioUnitario": 5,
            "cantidad": 20,
            "precioNeto": 200,
            "productoid": "que"
        }
    ]
}
```
Con la siguiente url
>localhost:3000/api/compra/

## Delete
Se consume con metodo DELETE Con la siguiente url
>localhost:3000/api/compra/id/:id

## DeleteItem
Se consume con metodo DELETE enviando en el body el siguente json
```json
{
	"compraid":"81",
	"productoid":"548asd88" 
	
}
```
Con la siguiente url
>localhost:3000/api/compra/item

## DeleteAll
Se consume con metodo DELETE con la siguiente url
>localhost:3000/api/compra/

## FindById
Se consume con metodo GET con la siguiente url
>localhost:3000/api/compra/id/:id

## FindByFecha
Se consume con metodo GET Con la siguiente url
>localhost:3000/api/compra/fecha

## FindByUser
Se consume con metodo GET con la siguiente url
>localhost:3000/api/compra/user/:user

## FindByProducto
Se consume con metodo GET con la siguiente url
>localhost:3000/api/compra/producto/:producto

## FindAll
Se consume con metodo GET con la siguiente url
>localhost:3000/api/compra/

## Update 
Se consume con metodo PUT enviando en el body el siguente json
```json
{
    "id": 81,
    "neto":400,
    "fecha": "07/10/1999",
    "userid": 1,
    "itemCompra": [
        {
            "precioUnitario": 5,
            "cantidad": 20,
            "precioNeto": 200
        },
        {
            "precioUnitario": 5,
            "cantidad": 20,
            "precioNeto": 200
        }
    ]
}
```
Con la siguiente url
>localhost:3000/api/compra/



