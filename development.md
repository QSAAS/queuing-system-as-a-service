## This Readme for the dev env to up and run
### prerequisites

- `docker` engine on your local machine
- `docker-compose`

### Steps to run environment

- once you have the repo cloned on your machine, `docker` and `docker-compose` you need only to run
in repo root directory
```` bash
    docker-compose up
````
- Once you have run you'll have the API, Database up and running 
-you can reach API at `PORT= 4040`
  
### Notes
- if you want to add new env variables you can search for env in docker compose or env files in docker compose
- we no longer need `dotenv` package
