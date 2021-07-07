#!/bin/bash
cp /external/*.js .
npm init -f -y
npm install /external/intersystems-iris-native --save 
npm install websocket --save
while true
do
	# echo "Press [CTRL+C] to stop.."
	sleep 60
done
