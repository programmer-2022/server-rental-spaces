.SILENT:

# Levantar contenedor base de datos Mongo DB
db:
	docker-compose --env-file .env -f ./docker-compose.yml up -d db
	docker ps -a
	
db-ui:
	docker-compose --env-file .env -f ./docker-compose.yml up -d mongo-express
	docker ps -a
	
# Construir la imagen de la aplicacion apartir del Dockerfile
build:
	docker build --no-cache -f Dockerfile -t rental_spaces_image .

# ejecutar app desarrollo
dev:
	docker-compose --env-file .env -f ./docker-compose.yml up rental-spaces-server-dev --build
	docker ps -a

# ejecutar app produccion
prod:
	docker-compose --env-file .env -f ./docker-compose.yml up -d rental-spaces-server-prod
	docker ps -a	

# ver logs de desarrollo
log-dev:
	docker logs -f rental-spaces-server-dev

# ver logs de produccion
log-prod:
	docker logs -f rental-spaces-server-prod

# ver logs de mongo
log-mongo:
	docker logs -f mongodb_service
	
# Borrar todos los contenedores
rm-all:
	@ERRORS=""; \
	for CONTAINER in rental-spaces-server-dev rental-spaces-server-prod mongodb ; do \
		if docker ps -a | grep -q $$CONTAINER; then \
			docker rm -fv $$CONTAINER 2>/dev/null || ERRORS="$$ERRORS Error al eliminar el contenedor $$CONTAINER.\n"; \
		else \
			ERRORS="$$ERRORS$$CONTAINER.\n"; \
		fi; \
	done; \
	echo -e "$$ERRORS"; \
	docker ps -a
	echo "Se han borrado los contenedores con éxito"

# Ingresar al contenedor de desarrollo
in-dev:
	docker exec -it rental-spaces-server-dev /bin/sh

# Ingresar al contenedor de produccion
in-prod:
	docker exec -it rental-spaces-server-prod /bin/sh

# Detiene y elimina todos los contenedores que están en ejecución
stop:
	docker-compose -f ./docker-compose.yml down
	docker ps -a

# Borra todas las imagenes que tengan nombre <none> denominadas 'dangling images'
rm-dang:
	if [ "$$(docker images -f "dangling=true" -q)" ]; then \
		docker rmi $$(docker images -f "dangling=true" -q); \
		docker images; \
	else \
		echo "No hay imágenes para borrar."; \
	fi

define remove_container
	@if docker ps -a | grep -q $(1); then \
		docker rm -fv $(1) 2>/dev/null || ERRORS="$$ERRORS Error al eliminar el contenedor $(1)."; \
	else \
		ERRORS="$$ERRORS No existe el contenedor $(1)."; \
	fi
endef

# Borrar todos los directorios
reset:
	make stop
	sudo rm -rf mongo_data dist mongo_logs