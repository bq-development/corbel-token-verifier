'use strict';

var chai = require('chai');
var expect = chai.expect;
var decoder = require('../src/tokenDecoder');

describe('Token decoder', function() {
 
  it('Returns false for invalid token values', function() {
    var invalidTokens = [
      'asdd',
      'true',
      'false'
    ]
   
    invalidTokens.forEach(function(token) {
      expect(decoder(token)).to.equals(false);
    })
  })

  it('Returns true for valid tokens', function() {
    var validTokens = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ',
      'eyJ0eXBlIjoiVE9LRU4iLCJjbGllbnRJZCI6IjU0MzgyMzA3Iiwic3RhdGUiOiIxNDcyNjM2Mjk5MDAwIiwiZG9tYWluSWQiOiJib29xczpudWJpY286ZXMiLCJkZXZpY2VJZCI6IldlYi1iODc5ZDAyZS02NzlmLTQ2MGItODNjYi1lMGVkNDQzYjdlNWEiLCJ1c2VySWQiOiJib29xczpudWJpY286ZXM6ZGVtb3Rlc3QxNzpleHRlcm5hbDpicS5jb20iLCJncm91cHMiOltdfQ.53cb1bb3d7f24.B9Hom1dSVx6lXztSc6AQSXz5yho'
    ]
   
    validTokens.forEach(function(token) {
      expect(decoder(token)).not.to.equals(false);
    })
  })

  it('Returns all parts for a user token', function() {
    var userToken = 'eyJ0eXBlIjoiVE9LRU4iLCJjbGllbnRJZCI6IjU0MzgyMzA3Iiwic3RhdGUiOiIxNDcyNjM5MjczMDAwIiwiZG9tYWluSWQiOiJib29xczpudWJpY286ZXMiLCJkZXZpY2VJZCI6IldlYi1hN2U4MjkzZi0yYzIyLTQ0YmYtOGViMS1hZWY0OTA1ZTUwNmMiLCJ1c2VySWQiOiJib29xczpudWJpY286ZXM6ZGVtb3Rlc3QxODpleHRlcm5hbDpicS5jb20iLCJncm91cHMiOltdfQ.53cb26cae7c84.UAA_Ue_IMeZu0EKyv8jEDMd5VGA'

    var decoded = decoder(userToken)

    expect(decoded).to.include.keys(
      'info',
      'expire',
      'signature')

    expect(decoded.info).to.include.keys(
        'type',
        'clientId',
        'state',
        'domainId',
        'deviceId',
        'userId',
        'groups'
      )
  })

  it('Decodes a refresh token', function() {
    var refreshToken = 'eyJpc09uZVVzZSI6dHJ1ZSwidHlwZSI6IlJFRlJFU0giLCJzdGF0ZSI6IjE0NzI2MzI4MDA4NjgiLCJjbGllbnRJZCI6IjU0MzgyMzA3IiwidXNlcklkIjoiYm9vcXM6bnViaWNvOmVzOmRlbW90ZXN0MTc6ZXh0ZXJuYWw6YnEuY29tIiwiZ3JvdXBzIjpbXSwiZGV2aWNlSWQiOiJXZWItYjg3OWQwMmUtNjc5Zi00NjBiLTgzY2ItZTBlZDQ0M2I3ZTVhIn0.158b5fd5f14.e9VR1g8KZWmN1Xs7NEIgXiQBKQM'

    var decoded = decoder(refreshToken)

    expect(decoded).to.include.keys(
      'info',
      'expire',
      'signature')

    expect(decoded.info).to.include.keys(
      'isOneUse',
      'type',
      'state',
      'clientId',
      'groups',
      'deviceId'
      )
  })
  
  it('Decodes a client token', function() {
    var clientToken = 'eyJ0eXBlIjoiVE9LRU4iLCJjbGllbnRJZCI6IjU0MzgyMzA3Iiwic3RhdGUiOiIxNDcyNjM2Mjk5MDAwIiwiZG9tYWluSWQiOiJib29xczpudWJpY286ZXMifQ.53cb1bb3d7b17.cvSw0NWicSL7UOuqymAvADHQlWA'

    var decoded = decoder(clientToken)

    expect(decoded).to.include.keys(
      'info',
      'expire',
      'signature')

    expect(decoded.info).to.include.keys(
      'type',
      'state',
      'clientId',
      'domainId'
      )
  })
})
