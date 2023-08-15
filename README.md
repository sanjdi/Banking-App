# Banking-App
This is a simple term deposit final balance calculator built on [Node.js](https://nodejs.org/en/docs) with [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html). It provides 2 enpoints to calculate final balance. 

## Design
### Architecture
![image](https://github.com/sanjdi/Banking-App/assets/135525812/a54dc4de-d610-4870-a38b-394fbef12e9c)

**Route** - Implemented with [Express.js](https://expressjs.com/en/guide/routing.html). Will pass incomming HTTP requests to the controller module.

**Controller** - Facilitate mapping of *client-server* data flow and service execution
* Read requests parameters
* Validate input values and pass errors to client if needed. ie. incorrect data type
* Execute relevent service methods and pass the response back to client

**Service** - Contains and executes calculation logic.

### Inputs

It requires following input paramters for execution.
* amount: number - Specify the starting amount
* rate: number - Specify the annual percentage interest rate (APR), without % sign
* term: number - Specify the investment term in months
* compound: string - Specify the frequency that interest is paid. Allowed values are *MONTHLY*, *QUATERLY*, *ANNUALLY* or *AT_MATURITY*
* yield: string - Specify the interest payment type. Allowed values are *RE_INVEST* or *INCOME_STREAM*

### Maintainability
Bellow scenarios describe how you can extend the application

**Scenario 1:** Add new frequency that interest is paid. ie. compound the interest "WEEKLY"

* Add "WEEKLY" value to CompoundingType enum
```sh
../models/deposit.ts
export enum CompoundingType {
  ....
  ....
  Weekly = "WEEKLY",
}
```

* Add number of times componding is calculated per year to calculatorService.compoundingTypeMapping object
```sh
../services/calculatorService.ts
export const compoundingTypeMapping = {
  ....
  ....
  WEEKLY: 52,
};
```

* Set WEEKLY as the *compound* parameter value when calling endpoints  
```sh
METHOD: GET
URI: http://localhost:4000/api/calculators/term-deposits?amount=10000&rate=1.1&term=36&compound=WEEKLY&yield=RE_INVEST
```
Or
```sh
METHOD: POST
URI: http://localhost:4000/api/calculators/term-deposits
Request Body Type: raw Json
Request Body:
{
    "amount": "10000",
    "rate": "1.1",
    "term": "36",
    "compound": "WEEKLY",
    "yield": "RE_INVEST"
}
```


**Scenario 2:** Extend the application to calculate cash deposit final balance. ie. use simple interest rate calculation formula.

* At Model, define the schema of CashDepositOptions that contain parameters needed for new formula
```sh
../models/deposit.ts
...
...
export interface CachDepositOptions {
  startingAmount: number;
  interestRate: number;
  investmentTerm: number;
}
```

* At Service layer, define a function that performs simple interest rate calculation
```sh
../services/calculatorService.ts
import { ..., ..., CashDepositOptions } from '../models/deposit.js';
...
...
export const calculateSimpleRateFinalAmount = (params: CashDepositOptions) => {
  const { startingAmount, interestRate, investmentTerm, extraDeposit } = params;
  ...
  let balance: number;
  /* implement calculation logic */
  ...
  return balance;
};
...
```

* At Controller layer, define a new function that maps requests, perform validations, execute service calls and send responses to new url 
```sh
../controllers/calculatorController.ts
import { ..., ..., calculateSimpleRateFinalAmount } from '../services/calculatorService.js';
import { ..., ..., CashDepositOptions } from '../models/deposit.js';
....
....
export const getCashDepositFinalBalance = (
  req: Express.Request,
  res: Express.Response
) => {
  ...
  ...
  /* implement field validations logic */
  ...
  /* create a CashDepositOptions object */
  const options: CashDepositOptions = {
    /* add input values in required format */
  };

  /* call the service */
  const result: FinalBalance = {
    finalBalance: calculateSimpleRateFinalAmount(options),
  };
  /* log the result to console */
  /* send reponse with FinalBalance to client */
};
....
```

* At Route layer, define a new route that will accept requests from new url path
```sh
../routes/calculatorRoutes.ts
import { ..., ..., getCashDepositFinalBalance } from '../controllers/calculatorController.js';
....
....
router.get('/cash-deposits', getCashDepositFinalBalance);
....
```

* Call the new endpoint  
```sh
METHOD: GET
URI: http://localhost:4000/api/calculators/cash-deposits?amount=10000&rate=0.25&term=36
```

## Setup

### Prerequisites
Following tools are required to run and test the application in your local mechine.
* [Git](https://git-scm.com/) - the version control system
* [npm](https://docs.npmjs.com/about-npm) - the package manager
* [Node.js](https://nodejs.org/en/docs) - the server environment for the application
* [Visual Studio Code](https://code.visualstudio.com/) - the integrated development environment 
* *Optional* [Postman API Client](https://www.postman.com/api-platform/api-client/) - required only if you intend to run the application using Postman. Please see [Run](#Run) section for alternative options.

### Steps
1. Open a new termail window in [Visual Studio Code](https://code.visualstudio.com/). Create a new folder
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
7. If all went ok, you will see something similar to this.
![image](https://github.com/sanjdi/Banking-App/assets/135525812/5ebad6ca-ac89-4b6b-a956-1dee51c52725)

8. After the Node.js server is up, open a new terminal window in [Visual Studio Code](https://code.visualstudio.com/). Execute bellow command to run the unit test suite.
```sh
npm test
```
9. If something similar to this is displayed, then you are all set.
![image](https://github.com/sanjdi/Banking-App/assets/135525812/40383173-f7a7-4808-8177-8abcc82f4986)

## Run
After the Node.js server is up, use any of the following methods to run the app.

### Option 1: Postman API Client

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


### Option 2: OpenAPI Doc

1. [OpenAPI (former Swagger)](https://swagger.io/docs/specification/about/) doc will be vailable at bellow uri.
```sh
http://{server}:{port}/api/docs
ie. http://localhost:4000/api/docs - as metioned in [Setup](#Steps) step #7 above
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

