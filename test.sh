#!/bin/sh

mosquitto -c mosq.conf -p 5000 &
sleep 2

./node_modules/.bin/mocha --recursive --reporter list test

killall mosquitto
