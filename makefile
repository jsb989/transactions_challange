podman:
	podman pod create --name postgre-sql -p 9876:80 -p 5432:5432

image:
	podman run --name db --pod=postgre-sql -d \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=Passw0rd \
    docker.io/library/postgres:14

install: podman image
	npm install
	npm run init
	npm run seed
	npm run dev

clean:
	podman pod stop postgre-sql
	podman pod rm postgre-sql