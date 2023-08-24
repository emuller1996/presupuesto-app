# Presuesto App

Esta es una aplicacion personal mia, para poner en practicas mis habilidades de back y front con las tecnologias JS.

tecnologias Utilziadas:
- ReactJS.
- ExpressJS
- MYSQL
- Sequielize


 
 


## Features

- Crear Presupuesto 
- Crear Proyectos
- Crear Contractos
- Crear Facturas


## Demo

Este proyecto lo tengo deployado con AWS.

Client :  http://presupuesto-app.s3-website-sa-east-1.amazonaws.com/

Server :  http://18.231.180.169:3009/


## Environment Variables

para correr este proyecto necesitas crear la sig variables de entorno.

`DB_USER`

`DB_PASSWORD`

`DB_HOST`

`DB_NAME`

`DB_PORT`

`PORT`





## Authors

- [@emuller1996](https://www.github.com/emuller1996) Estefano Muller


## Correr Local


Clonar el Proyecto

```bash
  git clone https://github.com/emuller1996/presupuesto-app.git
```

### Correr el Back-end

```bash
  cd server
```

Instalar Dependecias

```bash
  npm install
```

Asegurate que tengas las variables de entorno el un archivo .env en la carpeta /server

Start the server

```bash
  npm run start
```


### Correr el Front-end

```bash
  cd client
```

Instalar Dependecias

```bash
  npm install
```


Start the server

```bash
  npm run start
```


