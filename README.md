# Employee Data

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

### Running the code (at developing phase)

```bash
cd ./server
npm run dev
```

It will start the server with nodemon. So it will watch the changes and restart the server if some ot the files changed.

### Running the code (at production)

```bash
cd ./server
npm start
```

It will start the server with node.

### Testing with test.http

If you like to try the endpoints of the rest api, you can check the test.http file for urls are should work on your environment as well. And if you install the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extenstion for vscode you can actually run those in your editor.



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
