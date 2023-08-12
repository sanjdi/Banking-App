# aXmos-HomeHub-Api
aXmos-HomeHub-Api is a proof-of-concept API collection of a Cloud Based Home Automation system built on Node.js. 

## Setup
### Prerequisites
* [Node.js](https://nodejs.org/en/docs)

### Steps
1. Create a folder
```sh
mkdir repo
```
2. Navigate to folder
```sh
cd ./repo
```
3. Clone the repo
```sh
git clone https://github.com/sanjdi/Banking-App.git
```
4. Navigate to project root folder
```sh
cd ./Banking-App
```
5. Download project dependencies
```sh
npm install
```
6. Start Node.js server
```sh
npm start
```
7. If all went ok, you will see bellow lines at the end of the terminal window.
```sh
Calculator API is listening on -> http://localhost:4000
Banking App v1.0.0 API Docs are available at http://localhost:4000/api/docs
```
## Run the App
### Via Postman

### Via API Doc
Once the server is up after #7 above, a fully functional swagger doc is vailable at bellow uri. It allows you to test endpoints.
```sh
http://{server}:{port}/api/docs
ie. http://localhost:4000/api/docs as in #7 above
```
Click 'Try it out' button to test the API.
![image](https://github.com/sanjdi/Banking-App/assets/135525812/57d7b554-9bc3-405d-87c4-7689f6b081a3)
![APIDoc1](src/docs/APIDocs1.png)

Edit json request payload, and click 'Execute' button. Response will be displayed under 'Server response' section. 
![APIDoc2](src/docs/APIDocs2.png)
