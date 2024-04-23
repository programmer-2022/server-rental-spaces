<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="images/nestjs.png" alt="Nest Logo" width="512" /></a>
</p>

<h1 align="center">⭐Rental Spaces Server⭐</h1>

<p align="center">
  API Rest para el proyecto de renta de espacios comunitarios
</p>

<p align="center">
  <a href="https://github.com/programmer-2022/rental-spaces-back"><img src="https://github.com/AlbertHernandez/nestjs-service-template/actions/workflows/node.yml/badge.svg?branch=main" alt="nodejs"/></a>
  <a href="https://nodejs.org/docs/latest-v20.x/api/index.html"><img src="https://img.shields.io/badge/node-20.x-green.svg" alt="node"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-5.x-blue.svg" alt="typescript"/></a>
  <a href="https://docs.nestjs.com/v10/"><img src="https://img.shields.io/badge/npm-10.x-red.svg" alt="npm"/></a>
  <a href="https://fastify.dev/"><img src="https://img.shields.io/badge/Web_Framework-Fastify_⚡-black.svg" alt="fastify"/></a>
  <a href="https://swc.rs/"><img src="https://img.shields.io/badge/Compiler-SWC_-orange.svg" alt="swc"/></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Test-Vitest_-yellow.svg" alt="swc"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Dockerized 🐳_-blue.svg" alt="docker"/></a>
</p>

---

### 1. Configuracion Variables de Entorno

Necesitamos crear el archivo **.env** en la raiz del proyecto para el manejo de variables de entorno, podemos crearlo en base al archivo base **.env.example**

```bash
  > cp .env.example .env
```

### 2. Instalacion de Dependencias

Debemos instalar las dependencias del proyecto usando **npm** como gestor de paquetes, debemos previamente tener instalado
la version de NodeJS **v20.9**.

```bash
  > npm install
```

### 3. Comprobar versiones de Docker y Docker Compose

Debemos tener instalado Docker **v24.0.5** y Docker-Compose **v2.23.1**, comprobaremos las versiones con los siguientes comandos:

```bash
  > docker --version
  > docker-compose --version
```

### 4. Ejecucion del proyecto

#### 🧑‍💻 Comandos con DockerCompose

| Descripcion           | Comando                                                        | Ambiente   |
| --------------------- | -------------------------------------------------------------- | ---------- |
| Crear Imagen Inicial  | docker build --no-cache -f Dockerfile -t rental_spaces_image . | Dev/Prod   |
| Levantar contenedores | docker-compose up rental-spaces-server-dev                     | Desarrollo |
| Levantar contenedores | docker-compose up rental-spaces-server-prod                    | Produccion |
| Detener contenedores  | docker-compose down                                            | Dev/Prod   |

#### 🧑‍💻 Comandos con Makefile

| Descripcion                                               | Comando        | Ambiente   |
| --------------------------------------------------------- | -------------- | ---------- |
| Crear Imagen Inicial                                      | make build     | Dev/Prod   |
| Levantar contenedores                                     | make dev       | Desarrollo |
| Levantar contenedores                                     | make prod      | Produccion |
| Levantar Base de datos MongoDB                            | make db        | Database   |
| Levantar UI MongoExpress                                  | make db-ui     | Database   |
| Detener contenedores                                      | make stop      | Dev/Prod   |
| Ingresar al contenedor Desarrollo                         | make in-dev    | Desarrollo |
| Ingresar al contenedor Produccion                         | make in-prod   | Produccion |
| Ver Logs del contenedor Desarrollo                        | make log-dev   | Desarrollo |
| Ver Logs del contenedor Produccion                        | make log-prod  | Produccion |
| Ver Logs del contenedor MongoDB                           | make log-mongo | Produccion |
| Borrar todos los contenedores                             | make rm-all    | FileSystem |
| Borrar imagenes huerfanas <none>                          | make rm-dang   | FileSystem |
| Borrar carpetas de persistencia, produccion, dependencias | make reset     | FileSystem |

---

## 5. Realizar peticion al endpoint /health

Podemos hacer una peticion usando CURL, postman, insomnia o cualquier cliente REST para saber si nuestro servicio esta funcionando correctamente.

```bash
curl --request GET \
  --url http://localhost:8000/api/health
```

---

## 6. Configuracion del Debugger

EL modo de desarollo funciona con **hot-reload** y el puerto para **debug** es el`9229`.

Para configurar el debugger en Visual Code se debe crear un archivo en el directorio **vscode**
llamado **launch.json** el cual tendra la siguiente configuracion.

```json
{
  "version": "0.1.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to docker",
      "restart": true,
      "port": 9229,
      "remoteRoot": "/app"
    }
  ]
}
```

## ⚙️ Compilar y empaquetar proyecto para produccion

```bash
  > npm run build
```

## ✅ Testing

Podemos ejecutar los test con el siguiente comando

```bash
  > npm run test
```

Ejecutar solo test **unitarios**

```bash
  > npm run test:unit
```

Ejecutar solo test **e2e**

```bash
  > npm run test:e2e
```

## 💅 Linting

Ejecutar linter

```bash
  > npm run lint
```

Corregir errores

```bash
  > npm run lint:fix
```
