// JavaScript Document
// get order from Global ^ZSocketIn
//       ^ZSocketIn="wss://echo.websocket.org/"
//       ^ZSocketIn(0)=6
//       ^ZSocketIn(1)="Hello"
//       ^ZSocketIn(2)="World !"
//       ^ZSocketIn(3)="Robert"
//       ^ZSocketIn(4)="is waiting"
//       ^ZSocketIn(5)="for replies"
//       ^ZSocketIn(6)="exit"
//
// and set the reply in Global ^ZSocketOut
//         ^ZSocketIn="wss://echo.websocket.org/"
//         ^ZSocketOut(0)=6
//         ^ZSocketOut(1)="Hello"
//         ^ZSocketOut(2)="World !"
//         ^ZSocketOut(3)="Robert"
//         ^ZSocketOut(4)="is waiting"
//         ^ZSocketOut(5)="for replies"
//         ^ZSocketOut(6)="exit"
//
// server loop controlles by ^ZSocketRun
//       -1 => stop server and exit
//	  0 => wait for action
//        1 => sent to echo server
//       	^ZSocketRun(0)= echo server => "wss://echo.websocket.org/"
//
const irisnative = require('intersystems-iris-native')
const W3CWebSocket = require('websocket').w3cwebsocket;

console.log("\n\t*****************************");
//      see if we got an IRIS host to serve
var ip = process.argv.slice(2).toString().split(",")[0] ;
if (ip.toString()=="") {
	console.log("\t*** no IRIS host defined ****") ;
	console.log("\t********* game over *********");
	process.exit();  
	}
console.log("\tConnect to IRIS on: "+ip) ;

var port = 51773 ;
var namespace = "%SYS" ;
var username = "_system" ;
var password = "SYS" ;

// Create connection to InterSystems IRIS
const connection = irisnative.createConnection({host: ip, port: port, ns: namespace, user: username, pwd: password}) ;
console.log("Successfully connected to InterSystems IRIS.") ; 

// Create an InterSystems IRIS native object
const irisNative = connection.createIris() ;

var linecnt;
var text;
var line = 0;
var reply = 0;
var rows ;
var exit = false;
var echoserver = "?" ;
var run=0;

function getrun() {
	run=irisNative.get("ZSocketRun");
	if (run<0) { 
var namespace = "%SYS" ;
		try { client.close() } 
		catch(e) {}
		finale();
	}
	if (run>0) { 
		main();    
		console.log("\t********* next turn *********");
		setTimeout(getrun, 3000);
		}
	else {  
		console.log("\t*** wait 3sec for request ***");
		setTimeout(getrun, 3000);
		} 
	};
getrun();
console.log("\t******* Startup done ******** \n");

function Sleep(msec) {
	return new Promise(resolve => setTimeout(resolve, msec));
  	}; 

function main() {
	echoserver=irisNative.get("ZSocketRun",0).replace("localhost",ip);
	console.log("\techoserver: ", echoserver);
	rows=0;
	reply=0;
	linect=irisNative.get("ZSocketIn",0);
	if (linect) {
		rows=isNaN(parseInt(linect))?0:linect ;
		console.log("\t** Lines to process: "+rows+" **");
		}
	if (rows<1) {
		console.log("\t**** no lines to process ****"); 
		return; 
	}
  	irisNative.kill("ZSocketOut");
	irisNative.set(echoserver,"ZSocketOut") ;

	client = new W3CWebSocket(echoserver);

	client.onopen = function() {
		console.log("\t* WebSocket Client connected *");
  
		function ready() {
			if (client.readyState === client.OPEN) {
 				console.log("\t****** Client is ready ******") ;
				dolines();
			}
			else { 
				console.log("\t******* wait 500msec *******") ;
				setTimeout(ready, 500);
			}
 		};
    		ready(); 
  	};

	client.onerror = function() {
		console.log("\tConnect Error: " + error.toString());
    	};

	client.onclose = function() { 
		finale() 
		;}

	async function dolines() {
		line=0
		do {
			line++;
			text=irisNative.get("ZSocketIn",line);
			client.send(text);
			console.log("Line: "+line+" text> '"+text +"'") ;
			await Sleep(500);
 		} while (rows > line) ;
 		console.log("\n\t******* lines sent: "+line+" ******") ;     
 		console.log("\t*** replies received: "+reply+" ****\n") ;
	};

	client.onmessage = function(e) {
 		if (typeof e.data === 'string') {
			reply++;
 			console.log("Received: "+reply+" > '" + e.data + "'");
			irisNative.set(reply,"ZSocketOut",0);
			irisNative.set(e.data,"ZSocketOut",reply);
			exit=e.data.match(/exit/i)?true:false;
			if ((exit)||(reply>=line)) {
				irisNative.set(0,"ZSocketRun");
			};
		};
 	};
// end of main()
};

function finale() {
	irisNative.set(parseInt(reply),"ZSocketOut",0);
 	console.log("\t*** Client Service closed ***");
	process.exit();
}; 
