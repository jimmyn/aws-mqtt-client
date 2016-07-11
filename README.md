# AWS Websocket Pub/Sub client

[AWS MQTT](http://docs.aws.amazon.com/iot/latest/developerguide/protocols.html) Websocket Pub/Sub with AWS IoT based on [MQTT.js](https://github.com/mqttjs/MQTT.js).
Recently [AWS released support of WebSockets for IoT](https://aws.amazon.com/about-aws/whats-new/2016/01/aws-iot-now-supports-websockets-custom-keepalive-intervals-and-enhanced-console/) service. It is very easy to use as Pub/Sub message system for serverless web applications. You can post new messages from `AWS lambda function` via `http post request` and receive them as websocket messages on client.

## Installing it

````bash
npm install aws-mqtt-client --save
````

## Basic usage

1.  Create an IAM role and asign predefined `AWSIoTDataAccess` policy. (It is better to use [AWS Cognito](https://aws.amazon.com/cognito/) to provide temprerary credentiels for the front-end application, you can also customize policy to allow access only to user specific topics)
2.  Run AWS CLI command `aws iot describe-endpoint` to get IoT endpoint url.
3.  Create `mqttClient` with AWS credentials
````js
const mqttClient = new AWSMqtt({
	accessKeyId: AWS_ACCESS_KEY,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	sessionToken: AWS_SESSION_TOKEN,
	endpointAddress: AWS_IOT_ENDPOINT_HOST,
	region: 'us-east-1'
});
````
4.  Connect and recieve messages from your topic
````js
mqttClient.on('connect', () => {
	mqttClient.subscribe('test-topic');
	console.log('connected to iot mqtt websocket');
});
mqttClient.on('message', (topic, message) => {
	console.log(message.toString());
});
````
5.  Publish a message
````js
mqttClient.publish(MQTT_TOPIC, message);
````

### Complete [MQTT.js API](https://github.com/mqttjs/MQTT.js#api)

## Credits
Based on [Serverless JS-Webapp Pub/Sub with AWS IoT](http://stesie.github.io/2016/04/aws-iot-pubsub) article by [Stefan Siegl](https://github.com/stesie)  
This library is a wrapper around [MQTT.js](https://github.com/mqttjs/MQTT.js) npm package.
