# Fullstack Interview Challenge

## Task 1 - Modernization of the membership codebase (backend only)

While moving from the legacy code I made some decisions/assumptions: 
- Selected a testing library and wrote tests before starting the implementation of new routes. I chose supertest runner for the API tests because of it's seamless integration with Express.
- Moved the validation logic into middleware to simplify the controller.
- Moved the business logic to separate service.
- Decided to use plain functions instead of classes for controllers and services, because the size of the app is small right now. If we anticipate to have the more complicated backend, then classes would be a better idea. 
This task took me around 5 hours to finish. 

## Task 2 - Design an architecture to provide a membership export (conception only)

1. I assumed the company is using AWS and I used the services provided by them. But the concept should work the same with other insfrastructure providers.
2. To implement the asynchronious task proccessing I used queue and the service worker (can be lambda or node.js server running on EC2 instance) which will take the tasks from the queue and perform CSV generation. This will not block the main endpoint and enable the system to perform requests one by one when it's ready. Additionaly it brings the possibility to scale the workers if needed.

This task took me around 1 hour to finish. 

## Repository Intro
In this repository you will find an plain express.js server the exposes API endpoints to consumers. For this exercise, the API endpoints are not protected.

### Installation

```sh
npm install
```

### Usage

```sh
npm run start
```

### Run test
```sh
npm run test
```

## 🗒️ Conditions

- You will have multiple days for the challenge, but most of our candidates spend around **8h to 10h** on this assignment.
- You should put your code in GitHub or GitLab/Bitbucket and send us the link to your repository where we can find the source code. That means no ZIP files.
- Please make sure to include any additional instructions in a readme in case you change something about the compilation or execution of the codebase.

## 💻 Technologies:

We believe that great developers are not bound to a specific technology set, but no matter their toolbox they are able to think critically about how to structure and design good code. For this exercise, we provided just a small and simple set of tools to run the a application and tests. Feel free to use any library out there to help you with your implementation.

### Pre-installed

- Express - https://expressjs.com/
- TypeScript - https://www.typescriptlang.org/
- Jest - https://jestjs.io/

Best of luck and looking forward to what you are able to accomplish! 🙂
