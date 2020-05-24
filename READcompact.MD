The All-in-1 package of the WebSocket MicroService Demo 

To simplify the demo of the WebSocket-Micro-Server (WSockClientMicroSV)  
the whole package is now bundled into a sincle Docker Image  
including intersystems/iris-community:2020.2.0.204.0   

All you need to do now is:   
- docker pull __rcemper/rcc:iris-nodejs-compact__  
   _(once)_
- docker __run__ --rm --init -d \  
  --name=iris1 -p 52773:52773 -p 51773:51773 \  
  rcemper/rcc:iris-nodejs-compact  
  _(start the container)_  
- docker __exec__ -it iris1 bash wsgo.sh  
  _(start the micro service)_  
- docker __exec__ -it iris1 bash wsdemo.sh  
  _(start control to create test data, send to echoServer, receive it)_  
- docker exec -it iris1 bash wsstop.sh  
  _(evetually stop service if not done from control)_
- docker __stop__ iris1  
  _(terminate the container)_
