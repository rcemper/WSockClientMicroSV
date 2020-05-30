This addendum is mainly required to run the demo on  
Docker Desktop for Windows. 
- I failed to use continuation lines.
- In Linux you can get the host's IP-Address by $(hostname -I)
  I found no suitable equivalent in Windows. 
  Just runing ipconfig and typing in what you see.  
- Assuming this IRIS is the first container to run we an use  
  in Linux and in Windows __172.17.0.2__ as host address.

_To get the images:_
- __docker pull rcemper/rcc:demoJS__
  for the NodeJS Service container
- __docker pull store/intersystems/iris-community:2020.2.0.204.0__  
  for our fresh IRIS container
 
_For initialization_ (only required once)
- __docker run --name ini1 --init -it --rm --privileged -v vol1:/external rcemper/rcc:demoJS bash /rcc/init.sh__
  a docker volume "vol1" is created and loaded

_Start IRIS server first !_
- __docker run --name iris1 --init --rm -d -p 52773:52773 -p 51773:51773 -v vol1:/external store/intersystems/iris-community:2020.2.0.204.0 -b /external/pre.copy__
  
_Start NodeJS service container_
- __docker run --name rcc1 --init -it --rm rcemper/rcc:demoJS /usr/bin/node /rcc/nodejs/WSockIris.js 172.17.0.2__  
in Linux thsi works insimilar way    
 __docker run --name rcc1 --init -it --rm rcemper/rcc:demoJS /usr/bin/node /rcc/nodejs/WSockIris.js $(hostname -I)__

_Start control program for IRIS in a new command / terminal session_  
- __docker exec -it iris1 iris session iris ZSocket__

Enjoy the data going forward and return

