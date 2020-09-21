# Mocker
**Mocker** is a node app that allows APIs to be stood up and exposed in minutes to allow UI to be developed without the need of a functioning back end.

## Usage

#### Install

```
npm install
```

#### Import in code

```javascript
import Mocker from './bin/Mocker';
// Or commonjs
const Mocker = require("./bin/Mocker");
```

#### Start mocker server 

```
npm start
```

#### Start server with hot reloading

```
npm run dev
```

## Mocker Configuration
#### Create and start basic API
```javascript
const mocker = new Mocker(); // Mocker Instance
mocker.get("/healthcheck", () => ({status: "success"})); // Get Request + Response
mocker.start(); // Start Mocker Server
```

#### Get Requests
```javascript
mocker.get(url, callback(responseBody, allResponseData));
```

#### Post Requests
```javascript
mocker.post(url, callback(responseBody, allResponseData));
```
#### Create mocker configuration from Swagger file
```javascript
async function main() {
  await mocker.fromSwagger(swaggerFilePath);
  mocker.start();
}
main();
```

#### Mocker from swagger with custom end points
```javascript
async function main() {
  await mocker.fromSwagger(swaggerFilePath);
  mocker.get("/healthcheck", () => ({status: "success"}));
  mocker.start();
}
main();
```

#### Start server on a custom port
```javascript
const mocker = new Mocker();
mocker.init(portNumber);
mocker.start();
```

#### Bind data object to mocker instance
```javascript
const mocker = new Mocker();
mocker.init(portNumber, dataObject);
mocker.start();
```

#### Accessing mocker data
```javascript
const mocker = new Mocker();
mocker.init(4000, {
  users: {
    123: {
      account: ["Ben", "student"]
    }
  }
})

mocker.get("/name", (body, res) => ({ profile: mocker.data.users[res.query.uid].account}));
mocker.start();
```

#### Manipulating mocker data
```javascript
const mocker = new Mocker();
mocker.init(4000, {
  users: {
    123: {
      account: ["Ben", "student"]
    }
  }
})

mocker.post("/change-name/:id", (body, res) => {
  mocker.data.users[res.params.id].account[0] = body.name
  return { status: "success", name: mocker.data.users[res.params.id].account[0]}
});

mocker.get("/name", (body, res) => ({ profile: mocker.data.users[res.query.uid].account}));

mocker.start();
```
##### Body for  _"/change-name/:id"_:
```JSON
{
	"name":"jerry"
}
```
##### Response for  _"/change-name/:id"_:
```JSON
{
  "status": "success",
  "name": "jerry"
}
```


##### Response for  _"/name?uid=123"_:
```JSON
{
  "profile": [
    "jerry",
    "student"
  ]
}
```

#### Parameter and request variables
```javascript
const mocker = new Mocker();
mocker.get("/user/:id/:name", (body, res) => ({id: res.params.id, name:`${res.params.name} (${res.query.nickname})`}));
mocker.start();
```

##### Result for  _"/user/123/ben?nickname=bob_":
```JSON
{
    id:"123", 
    name:"ben (bob)"
}
```

#### Error Handling
##### Set global error message
```javascript
const mocker = new Mocker();
mocker.error = {error: "An issue occured"};
```
##### Result:
```JSON
{
    error:"An issue occured"
}
```

##### Request specific errror
```javascript
const mocker = new Mocker();
mocker.error = {error: "An issue occured"};
mocker.get("/healthcheck", () => ({status: "success"}), {status: "failure"});
```
##### Result when recieving an error on _"/healthcheck_":
```JSON
{
    status:"failure"
}
```
