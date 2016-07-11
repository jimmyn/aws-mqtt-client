"use strict";
import v4 from 'aws-signature-v4';
import crypto from 'crypto';
import MqttClient from 'mqtt/lib/client';
import websocket from 'websocket-stream';

class AWSMqtt extends MqttClient {
  constructor(options = {}) {
    super(() => {
      let url = v4.createPresignedURL(
        'GET',
        options.endpointAddress,
        '/mqtt',
        'iotdevicegateway',
        crypto.createHash('sha256').update('', 'utf8').digest('hex'),
        {
          key: options.accessKeyId,
          secret: options.secretAccessKey,
          region: options.region,
          expires: options.expires || 15,
          protocol: 'wss'
        }
      );
      if (options.sessionToken) {
        url += '&X-Amz-Security-Token=' + encodeURIComponent(options.sessionToken);
      }
      return websocket(url, ['mqttv3.1'], options.wsOptions);
    });
  }
}

export default AWSMqtt;

