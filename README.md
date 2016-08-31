# Corbel Token Verifier


[![NPM Version][npm-badge]][npm-url]

## Usage

```
npm install --save corbel-token-verifier
```

```javascript

var tokenVerifier = require('corbel-token-verifier');

var myToken = 'Bearer AxssdasAS....SDA331';

var tokenObject = tokenVerifier(myToken);

if(tokenObject){
  //Is a valid token
}
```

## API methods

- tokenObject.isUser()
- tokenObject.isClient()
- tokenObject.isRefreshToken()
- tokenObject.getUserId()
- tokenObject.getClientId()
- tokenObject.getDeviceId()
- tokenObject.getDomainId()
- tokenObject.hasExpired()
- tokenObject.getExpireTime()
- tokenObject.getInfo()

[npm-badge]: https://badge.fury.io/js/corbel-token-verifier.svg
[npm-url]: https://www.npmjs.org/package/corbel-token-verifier
