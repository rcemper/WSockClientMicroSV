# WSockClientMicroSV
Docker based Micro Server as WebSocket Client  

This demo is a redesign of the WebSocket Client based on Node.js existing already for Caché.
The major changes:  
- use of the new IRIS Native API for Node.js   
https://docs.intersystems.com/iris20192/csp/docbook/DocBook.UI.Page.cls?KEY=BJSNAT  
    especially Working with Global Arrays  
https://docs.intersystems.com/iris20192/csp/docbook/Doc.View.cls?KEY=BJSNAT_globals  
- change from a directly triggered client to a server design  
- put the result into a separate docker image as example for a MicroService / MicroServer  
- add a simple interface in IRIS to control the MicroService execution.  
