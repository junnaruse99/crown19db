FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

COPY ./badproxy /etc/apt/apt.conf.d/99fixbadproxy

RUN apt-get clean && apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get install -y libmysqlclient-dev libpq-dev postgresql

COPY . usr/src/back
COPY requirements.txt usr/src/back/requirements.txt

WORKDIR /usr/src/back

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["python3", "app.py"]
