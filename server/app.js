import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";

//set up express instance as the var "app"

const app = express()

//set up that middleware!
app.use(morgan("dev")); //while in dev environment, use morgan for additional logging, etc.
app.use(express.urlencoded({ extended: false })); //allows express to read POST request objects
app.use(express.static('public')); //pointing to the public folder for vite/express to understand where to look??
app.use(express.json()); //lets seerver and front-end know that they'll be communicating with JSON

//import handlerFunctions
import handlerFunctions from "./controller.js";

  //Routes
  //Before creating an endpoint, address 4 questions:
  //1. what is the purpose of my endpoint?
  //2. will i need any queries/params/body objects for receiving data?
  //3. what will endpoint string look like ("/home")
  //4. what do i want the response to look like when the front-end receives it?
  
  //First Endpoint (GET)
  // - When the front-end makes a request to "/invoices", we want our server to send it an array of invoice objects
  // 1. Get a list of all invoices (TEST_DATA)
  // 2. no - generic request for all TEST_DATA
  // 3. "/invoices"
  // 4. array of invoice objects

  app.get("/invoices", handlerFunctions.getInvoices);

  //2nd endpoint (POST)
  // 1. add a new row of invoice data to our TEST_DATA in controller.js
  // 2. yes - req.body to contain the new invoice obj
  // 3. "/invoice/add"
  // 4. Send back just the new obj with a confirmation
  app.post("/invoice/add", handlerFunctions.addInvoice)

  //3rd endpoint(DELETE)
  //1. Delete a specified invoice from TEST_DATA
  //2. yes - req.params for id
  //3. "/invoice/delete/:id"
  //4. send back boolean confirmation
  app.delete("/invoice/delete/:id", handlerFunctions.deleteInvoice)

  //4th endpoint (PUT)
  //1. update the rate, descrip, and hours on a specific invoice
  //2. id - req.params, rate, descrip, and hours - req.body
  //3. "/invoice/update/:id"
  //4. send back the updated invoice with confirmation
  app.put("/invoice/update/:id", handlerFunctions.updateInvoice)


  //Open up the door to our server
  ViteExpress.listen(app, 9021, () => console.log(`Travis Scott's rodeo album is running @ http://localhost:9021`))