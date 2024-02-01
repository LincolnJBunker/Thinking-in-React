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

//Set up a global var to simulate the DB
const TEST_DATA = [
    { id: 0, description: 'Content plan', rate: 50, hours: 4 },
    { id: 1, description: 'Copy writing', rate: 50, hours: 2 },
    { id: 2, description: 'Website design', rate: 50, hours: 5 },
    { id: 3, description: 'Website development', rate: 100, hours: 5 },
  ];

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

  app.get("/invoices", (req, res) => {
    res.send({
        message: "All invoices from test data",
        invoice: TEST_DATA
    });
  });

  //Open up the door to our server
  ViteExpress.listen(app, 9021, () => console.log(`Travis Scott's rodeo album is running @ http://localhost:9021`))