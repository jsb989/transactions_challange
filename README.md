# transactions_challange

- Create an SPA that exhibits a page with a table of financial transactions that can be filtered by date range (start month/end month), and a page with the transaction details on click. Use Vue, GraphQL, Prisma (ORM) & Postgres. Use TypeScript in the back-end. No need for any styling on the page. A CSV file with the transactions is attached to this email. Submit a Github repo link with the result.

# Backend

## Install PODMAN
>
    #On CentOS/Rocky Linux
    sudo yum install podman

    #On Debian/Ubuntu
    sudo apt-get install podman

    #On Fedora
    sudo dnf install podman

    #On RHEL 8
    sudo yum module enable -y container-tools:rhel8
    sudo yum module install -y container-tools:rhel8

    #On RHEL 7
    sudo subscription-manager repos --enable=rhel-7-server-extras-rpms
    sudo yum -y install podman
>

## Create container postgres
> podman pod create --name postgre-sql -p 9876:80 -p 5432:5432
- run 'podman pod ps' to verify if it's running correctly.

The output should be something like:
> 
    POD ID        NAME          STATUS   CREATED             INFRA ID      # OF CONTAINERS
    993b300ccd24  postgre-sql   Created  About a minute ago  2506f28b5d5a  1
>

Run the following command to pull configure postgres and pull pgadmin image from docker.
> 
    podman run --pod postgre-sql \
    -e 'PGADMIN_DEFAULT_EMAIL=admin@airbank.com' \
    -e 'PGADMIN_DEFAULT_PASSWORD=Passw0rd'  \
    --name pgadmin \
    -d docker.io/dpage/pgadmin4:latest
>

Pull the PostgreSQL 14 image from docker
> podman pull docker.io/library/postgres:14

Run PostgreSQL 14 container
>
    podman run --name db --pod=postgre-sql -d \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=Passw0rd \
    docker.io/library/postgres:14
>

If everything is ok, you should be able to access PgAdmin from 
http://localhost:9876/
