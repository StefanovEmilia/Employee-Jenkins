# Employee Data

This project was primarily developed during my studies in the web module. It showcases my skills in frontend development with `React` and backend development with `Express.js` and `MongoDB`.

On the DevOps side, I focused on deployment with CI/CD pipeline integration using `Dockerfile` and `Jenkinsfile`.

The aim of the usage of Dockerfile and Jenkinsfile is to create a docker image and push it to a private AWS ECR. When Jenkins runs the Jenkinsfile, it will build the frontend, the docker image, and push it to the corresponding ECR.

# How to RUN the web application

## Prerequisites
- NodeJS installed version 20.11.1 or higher
- NPM installed version 10.2.4 or higher
- Existing MondoDB database

## Client side

### Install dependencies

```bash
cd ./client
npm install
```

### Build the project
```bash
cd ./client
npm run build
```

This will build your project and creates **dist** folder for your frontend. Do not rename it since the **server.js** file looks after this directory to serve the frontend routes!

## Server side

### Install dependencies
```bash
cd ./server
npm install
```

### .env file
Create .env file and put `MONGO_URL` variable with your connection string in it. 

### Prepare the database

```bash
cd ./server
npm run populate
```

**populate command** will run the populate.js file as a script and it will generate a bunch of starter data for your database. 

### Running the code (at production)

```bash
cd ./server
npm start
```

It will start the server with node.
The webpage will be available at http://localhost/8081

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.
