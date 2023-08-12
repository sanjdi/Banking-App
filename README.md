# Banking-App API
This is a simple term deposit final balance calculator built on Node.js. Use provided enpoint to as descibed in [APIDoc](#APIDoc). 

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

## Run
### Postman
After the Node.js server is up, use [Postman API Client](https://www.postman.com/api-platform/api-client/) to test the endpoint.

![image](https://github.com/sanjdi/Banking-App/assets/135525812/7da6039b-6bc9-49bc-bee8-41e7ae9ff3a3)
**Request Format**
```sh
METHOD: POST
URI: http://localhost:4000/api/calculators/term-deposits
Request Body Type: raw Json
Request Body:
{
    "amount": "10000",
    "rate": "1.1",
    "term": "36",
    "compound": "AT_MATURITY",
    "yield": "RE_INVEST"
}
```
**Request Body**

* amount: number - Specify the starting amount
* rate: number - Specify the annual percentage interest rate (APR), without % sign
* term: number - Specify the investment term in months
* compound: string - Specify the frequency that interest is paid. Allowed values are "MONTHLY", "QUATERLY", "ANNUALLY" or "AT_MATURITY"
* yield: string - Specify the interest payment type. Allowed values are "RE_INVEST" or "INCOME_STREAM"

### APIDoc
After the Node.js server is up, use API doc to test the endpoint. [Swagger](https://swagger.io/docs/specification/basic-structure/) API doc is vailable at bellow uri. ie. http://localhost:4000/api/docs as in #7 above.
```sh
http://{server}:{port}/api/docs
```
Click 'Try it out' button to test the API.

![image](https://github.com/sanjdi/Banking-App/assets/135525812/a8c2a1c3-6d1f-4274-b60a-fd6868aaf894)

Edit the request json payload as required, and click 'Execute' button. Response will be displayed under 'Server response' section. 

![image](https://github.com/sanjdi/Banking-App/assets/135525812/9879ebac-9560-4a02-b0c7-aa990afdb7bd)

