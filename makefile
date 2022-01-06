.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

# run docker
docker:
	docker run -it --rm -v ${PWD}:/react/app -v /react/app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true \
    pooepw/coviddb:dev

format:
	black ./back/*.py

# deploy front
deploy-front:
	cd react; \
    npm run deploy

# deploy back
deploy-back:
	git checkout main
	git pull origin main
	git subtree push --prefix back heroku main
	git checkout dev
all:

# files to be checked for existence
CFILES :=                                 \
    .gitignore                            \
    .gitlab-ci.yml

# check files exist
check: $(CFILES)