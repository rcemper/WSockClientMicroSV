## Inspiration
Using the IRIS native API for Node.JS was the oportunity to present a MicroService operating in a Docker container.

## What it does
A WebSocketClient Service runs in an own container checking for messages to be submitted using IRIS native API for Node.JS.  
The service operates with 3 globals (Run/Stop, WSserver), Input, Output.  
All information is provide in IRIS
To visiualize oparation the containr runs inteactive.
Control / Iput /output is all managed from a utiltiy in Iris   

## Challenges I ran into
- run a vanilla IRIS distribution out of the box __without docker-compose__
- adapt NodeJS interface from Caché into new IRIS native API. 

## Accomplishments that I proud of
no need for ZPM or docker-compose. A single docker container does it all.
run the same image on nativ Docker (Linux) and Docker Desktop for Windows, (had no acces to MAC)

## What I learned
Handling and running more than 1 Docker container in cooperation.  

## Built with
IRIS Community Edition in Docker, IRIS openapi API, NodeJs, Docker utiltiy functions

## Installation with Docker

## Prerequisites
Make sure you have native Docker od Docker Desktop installed. Pull and inti the demo
- __docker pull store/intersystems/iris-community:2020.2.0.204.0__
- __docker pull rcemper/rcc:demoJS__  
- __docker run --name ini1 --init -it --rm --privileged -v vol1:/external rcemper/rcc:demoJS bash /rcc/init.sh a docker__  

Detailed description: https://github.com/rcemper/WSockClientMicroSV/blob/master/READMEwindows.MD

## How to Work With it
Run first a docker exec session for the control / in-out utiltiy   
__docker run --name iris1 --init --rm -d -p 52773:52773 -p 51773:51773 -v vol1:/external store/intersystems/iris-community:2020.2.0.204.0 -b /external/pre.copy__  
Next start the Service process  
__docker run --name rcc1 --init -it --rm rcemper/rcc:demoJS /usr/bin/node /rcc/nodejs/WSockIris.js 172.17.0.2__  

Detailed description: https://github.com/rcemper/WSockClientMicroSV/blob/master/READMEMORE.MD
