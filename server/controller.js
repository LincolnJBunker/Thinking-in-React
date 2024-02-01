//Set up a global var to simulate the DB
let TEST_DATA = [
    { id: 0, description: 'Content plan', rate: 50, hours: 4 },
    { id: 1, description: 'Copy writing', rate: 50, hours: 2 },
    { id: 2, description: 'Website design', rate: 50, hours: 5 },
    { id: 3, description: 'Website development', rate: 100, hours: 5 },
  ];

  let globalId = 4

  const handlerFunctions = {

    getInvoices: (req, res) => {
        res.send({
            message: "All invoices from test data",
            invoice: TEST_DATA
        });
      },

      addInvoice: (req, res) => {
        //get the description from req.body
        const { description } = req.body
        //create a new "invoice object"
        const newInvoice = {
            id: globalId,
            description: description,
            rate: 0,
            hours: 0
        }
        //push that new object into TEST_DATA
        TEST_DATA.push(newInvoice)
        //increment globalId
        globalId++
        //send back the new obj to the front-end
        res.send({
            message: "New invoice added to test data",
            newInvoice: newInvoice
        })
      },

      deleteInvoice: (req, res) => {
        //grab id from params
        const { id } = req.params
        //delete the element from TEST_DATA
        TEST_DATA = TEST_DATA.filter((invoice) => {
            return invoice.id !== +id
        })
        
        res.send({
            message: "I tried to delete this invoice",
            status: true
        })

      },

      updateInvoice: (req, res) => {
        //grab id from params
        const { id } = req.params
        //grab rate hours and descrip from body
        const { rate, hours, description } = req.body
        //find the corresponding invoice to update - find the index??
        const index = TEST_DATA.findIndex((invoice) => {
            return invoice.id === +id
        })
        //with the index, I can mark that invoice
        const invoiceToUpdate = TEST_DATA[index]
        //update the atributes of invoiceToUpdate
        invoiceToUpdate.description = description
        invoiceToUpdate.rate = rate
        invoiceToUpdate.hours = hours

        //send back invoiceToUpdate
        res.send({
            message: "Invoice updated",
            updatedInvoice: invoiceToUpdate
        })
      },

  }

  export default handlerFunctions