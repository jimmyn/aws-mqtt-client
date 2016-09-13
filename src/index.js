"use strict";
import v4 from 'aws-signature-v4';
import crypto from 'crypto';
import MqttClient from 'mqtt/lib/client';
import websocket from 'websocket-stream';

class AWSMqtt extends MqttClient {
  constructor(options = {}) {
    const {
            endpointAddress,
            accessKeyId,
            secretAccessKey,
            sessionToken,
            region,
            expires = 15,
            wsOptions,
            ...mqttOptions
          } = options;
    super(() => {
      let url = v4.createPresignedURL(
        'GET',
        endpointAddress,
        '/mqtt',
        'iotdevicegateway',
        crypto.createHash('sha256').update('', 'utf8').digest('hex'),
        {
          key: accessKeyId,
          secret: secretAccessKey,
          region,
          expires,
          protocol: 'wss'
        }
      );
      if (sessionToken) {
        url += '&X-Amz-Security-Token=' + encodeURIComponent(sessionToken);
      }
      return websocket(url, ['mqttv3.1'], wsOptions);
    }, mqttOptions);
  }
}

export default AWSMqtt;

