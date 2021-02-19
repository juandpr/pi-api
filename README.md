# pi-api
REST API to get the digits of the number PI


# Useful commands
`npm start` starts the API.

`npm test` run tests.


# API usage
```
GET /pi
{
  decimals: '14159265'
  start: 0,
  length: 8
}

GET /pi?start=2&length=5
{
  decimals: '15926'
  start: 2,
  length: 5
}
```
