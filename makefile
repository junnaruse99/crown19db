.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

# run docker
docker:
	docker run -it --rm -v ${PWD}:/react/app -v /react/app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true \
    pooepw/coviddb:dev
 
all:

# files to be checked for existence
CFILES :=                                 \
    .gitignore                            \
    .gitlab-ci.yml  

# check files exist
check: $(CFILES)