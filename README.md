# Banking-App API
This is a simple term deposit final balance calculator built on Node.js with TypeScript. 

## Setup

### Prerequisites
* [Node.js](https://nodejs.org/en/docs)
* [Postman API Client](https://www.postman.com/api-platform/api-client/) - only if you intend to test using Postman. Please see [RUN](#Run) section for alternative testing options.

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
After the Node.js server is up, use any of the following methods to run the app.

### Inputs

It requires following input paramters for execution.
* amount: number - Specify the starting amount
* rate: number - Specify the annual percentage interest rate (APR), without % sign
* term: number - Specify the investment term in months
* compound: string - Specify the frequency that interest is paid. Allowed values are *MONTHLY*, *QUATERLY*, *ANNUALLY* or *AT_MATURITY*
* yield: string - Specify the interest payment type. Allowed values are *RE_INVEST* or *INCOME_STREAM*

### Postman API Client

1. To test *GET* endpoint, specify query parametres with required values, and click *Send*. Response will be displayed in the pannel.
```sh
METHOD: GET
URI: http://localhost:4000/api/calculators/term-deposits?amount=10000&rate=1.1&term=36&compound=QUATERLY&yield=RE_INVEST
```
![image](https://github.com/sanjdi/Banking-App/assets/135525812/ea8d4c91-bb09-4529-a8e5-caf936cddc2d)

3. To test *POST* endpoint, specify request parameters in *raw json* format, and click *Send*. Response will be displayed in the pannel.
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
![image](https://github.com/sanjdi/Banking-App/assets/135525812/7da6039b-6bc9-49bc-bee8-41e7ae9ff3a3)


### OpenAPI Doc

1. [OpenAPI (former Swagger)](https://swagger.io/docs/specification/about/) doc will be vailable at bellow uri. ie. http://localhost:4000/api/docs as metioned in [Setup](#Steps) #7 above.
```sh
http://{server}:{port}/api/docs
```
![image](https://github.com/sanjdi/Banking-App/assets/135525812/787d110d-af92-4a4f-8712-c1f7ed87e61c)

2. Expand *GET* endpoint, and click *Try it out* button
![image](https://github.com/sanjdi/Banking-App/assets/135525812/63851bed-7691-4afd-8847-b247d302fd2e)

3. Enter desired values, and click *Execute* button. Response will be displayed under *Server response* section.
![image](https://github.com/sanjdi/Banking-App/assets/135525812/33dbcc01-f2b6-4652-b560-4bd03a64567d)

4. Expand *POST* endpoint, and click *Try it out* button
![image](https://github.com/sanjdi/Banking-App/assets/135525812/a8c2a1c3-6d1f-4274-b60a-fd6868aaf894)

5. Edit the request json payload as required, and click *Execute* button. Response will be displayed under *Server response* section. 
![image](https://github.com/sanjdi/Banking-App/assets/135525812/9879ebac-9560-4a02-b0c7-aa990afdb7bd)

