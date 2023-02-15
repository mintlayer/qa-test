# Mintlayer QATest
The only purpose of this repo is to be used as technical test for new QA Engineers.


## What are the requirements to setup this project?
This project requires `Docker Desktop` intalled.


## How to setup this project?
Just clone the repo and install deps.

```bash
git clone URL
cd qatest
```

Now it's time to turn on the docker machine.

```
cd docker
docker-compose up
```

## How to run this project?

Install dependencies in the new image.

```
cd qatest
cd docker
docker-compose exec node sh
npm i
```

Run `dev` script from NPM.

```bash
npm run dev
```

Then open your browser on the address [http://localhost:5173](http://localhost:5173).
