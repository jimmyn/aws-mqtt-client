"use strict";
import AWSMqtt from '../src';
import MqttClient from 'mqtt/lib/client';
import chai from 'chai';
import chaiString from 'chai-string';
chai.use(chaiString);
const expect = chai.expect;

let awsMqttClient;

describe("AWSMqtt", () => {
  beforeEach(() => {
    awsMqttClient = new AWSMqtt({
      accessKeyId: 'ASIAJKQ5TEVEKOEAUXCQ',
      secretAccessKey: 'NDHu8pMF7MusU5ObAXS3nHTZHBNg/1dz6J/TVjE6',
      sessionToken: 'FQoDYXdzEC4aDAXdeKfijZ+FZEDOwyKuAnvcowRhlgZjcsitQh5ICV+TBwrfd1K65A8rzWV6X7tR3nOJSq6YB/QQmWak7D4+7FXNiaLa2szf6YeOaSm6pb6gervq+vi/TJH4mQ38HXM0mHsceqmx28T3Hj7enqCNmEp8C/tIPRfnyQ0jhfvdS9FKoURKPgRU1m/1BZku0Q+tUirFZcHu8mCEjqAAUG3OWcfNaYyhMoYUnEPmQVBWKs2vYzgObC3sDxQq8glXSms5u8/djCWxM1bvpZbvQhll8QfSFUV0ov59DLz7CS51pomLGSkbEoJC5fb+v2KeGLLAbv3hwP6RfkRodjF/H0PkjHzVyfWry5xfbFaoi65eQ/xexBvvZf8NAYWZuNl7jnzAKVL4xIHZWKm/SeOmi/5+C07xm+kqeZJRNmaUeZtfKNa0jrwF',
      endpointAddress: 'bfurjhgcnbvcx.iot.us-east-1.amazonaws.com'
    })
  });

  it("should be an instance of MqttClient", () => {
    expect(awsMqttClient).instanceof(MqttClient);
  });

  it("should contain correct url", () => {
    expect(awsMqttClient.stream.socket.url).to.startsWith('wss://bfurjhgcnbvcx.iot.us-east-1.amazonaws.com/mqtt');
  });

  it("should contain security token", () => {
    expect(awsMqttClient.stream.socket.url).to.contain('Amz-Security-Token=FQoDYXdzEC4aDAXdeKfijZ%2BFZEDOwyKuAnvcowRhlgZjcsitQh5ICV%2BTBwrfd1K65A8rzWV6X7tR3nOJSq6YB%2FQQmWak7D4%2B7FXNiaLa2szf6YeOaSm6pb6gervq%2Bvi%2FTJH4mQ38HXM0mHsceqmx28T3Hj7enqCNmEp8C%2FtIPRfnyQ0jhfvdS9FKoURKPgRU1m%2F1BZku0Q%2BtUirFZcHu8mCEjqAAUG3OWcfNaYyhMoYUnEPmQVBWKs2vYzgObC3sDxQq8glXSms5u8%2FdjCWxM1bvpZbvQhll8QfSFUV0ov59DLz7CS51pomLGSkbEoJC5fb%2Bv2KeGLLAbv3hwP6RfkRodjF%2FH0PkjHzVyfWry5xfbFaoi65eQ%2FxexBvvZf8NAYWZuNl7jnzAKVL4xIHZWKm%2FSeOmi%2F5%2BC07xm%2BkqeZJRNmaUeZtfKNa0jrwF');
  });
});
