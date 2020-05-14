
Instead of a utility you call directly on you IRIS host you now send a work-packages  
to the MicroService as would typically do with System Interoperability (aka.ENSEMBLE):  
of course you have the option of more than one WebSocket Server.  
Once the WebSocket Client Service has done its job you get back the result from it.  

The advantage over the built-in WebSocket Client is, that all Network, Security,   
Firewall issues are kept away from the core data server. Not to talk about the  
experience and quality Node.js has in this arena.  

The demo uses wss://echo.websocket.org/ as default EchoServer  
Next you enter some lines of text.  
At any point you can add "Lorem Ipsum" text for more content between your own text.  
Next you sent it to the service and wait for the echo.  
There is also the option to change your text before sending   
as Exit the control program or Stop the service.

All this processing runs asynchronously.   
Instead of waiting for completion the Listener displays periodically  
what was received from echo so far.  

To __install__ it you need a  
- docker image for IRIS ( intersystems/iris-community:2020.2.0.199.0 )  
- docker image for the WebSocket MicroServer (rcemper/rcc:demoJS)  
- WSockClientMicroSV.tar.gz  from Open Exchange or here to make use of  
  IRIS-Docker-micro-Durability https://github.com/rcemper/IRIS-Docker-micro-Durability  
- check directory demo: set protection to rwx (chmod 777) as Docker Image is a nobody at your level 

To __run__ it start IRIS first  (either -d or -it to observe the behaviour) __from directory demo__ (!)   

    docker run --name iris1 --init --rm -d \   
    -p 52773:52773 -p 51773:51773 \   
    -v $(pwd):/external \   
    intersystems/iris-community:2020.2.0.199.0 \   
    -b /external/pre.copy   

next start the MicroServer   

    docker run --name rcc1 --init -it --rm \  
    rcemper/rcc:demoJS \  
    /usr/bin/node \  
    /rcc/nodejs/WSockIris.js \  
    $(hostname -I)  

as you started it with __-it__ you see  

    platform = linux: ubuntu  

        *****************************  
        Connect to IRIS on: 192.168.0.23  
    Successfully connected to InterSystems IRIS.  
        *** wait 3sec for request ***  
        ******* Startup done ********  

        *** wait 3sec for request ***  
        *** wait 3sec for request ***  

then the control application in a new Linux terminal  

    docker exec -it iris1 iris session iris ZSocket  

and you see  

    *** Welcome to WebSocket Micoservice demo ***  
    Known Hosts (*=Exit) [1]:  
    1  wss://echo.websocket.org/  
    2  --- server 2 ----  
    3  --- server 3 ----  
    select (1):  ==> wss://echo.websocket.org/  
    #
    Enter text to get echoed from WebSocketClient Service
    Terminate with * at first position
    or get generated text by %
    or append new text with @

    1    hello socket microServer
    2    now you got 2 lines
    3    *

    Select action for WebClient Service
    New EchoServer (E), Send+Listen(S),New Text(N),Exit(X), Exit+Stop Client(Z) [S]s
    %%%%%%%%%%%%%%%%%%%%%%%%%%

    ******* 0 Replies *******

    ******* 2 Replies *******
    1    hello socket microServer
    2    now you got 2 lines


    Select action for WebClient Service

and  on MicroService  

    *** wait 3sec for request ***
    echoserver:  wss://echo.websocket.org/
    ** Lines to process: 1 **
    ********* next turn *********
    * WebSocket Client connected *
    ****** Client is ready ****** 
    
    Line: 1 text> 'hello socket microServer '
    Received: 1 > 'hello socket microServer '

    Line: 2 text> 'now you got 2 lines '
    Received: 2 > 'now you got 2 lines '
    
    ******* lines sent: 2 ******
    *** replies received: 2 ****

    *** wait 3sec for request ***


__NOTICE: ALL SCRIPTS ARE FOR LINUX ONLY !__
