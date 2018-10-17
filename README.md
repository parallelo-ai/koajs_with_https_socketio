# koajs_with_https_socketio
This is a simple implementation of KoaJS application with 
the official SocketIO library, served through HTTPS.

This repository is instrumental to [this blog post](http://blog.parallelo.ai/socketio-communications-with-koajs-revisited/)

## Generating self signed certificate

You'll need to have `openssl` installed, and then from within your clone 
of this repository run

```
openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
```

Providing a passphrase which you'll need to write at the line 8 of the file
`index.js` in order for the code to work
