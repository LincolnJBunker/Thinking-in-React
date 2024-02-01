import './InvoiceTable.css';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import AddButton from './AddButton';
import { useState } from 'react';
import axios from 'axios';

let globalId = 4

function InvoiceTable({ initialData }) {
    //Take initialData and turn it into state to not have to refresh it from app each time we modify it
    const [currentData, setCurrentData] = useState(initialData)


    //loop through initial data and return a <TableRow/> component for each invoice objecet in the array
    const rows = currentData.map((invoice) => {
        //destructure the array
        const { id, description, hours, rate } = invoice;

        return (
            <TableRow
                key={id}
                initialIsEditing={false}
                initialInvoiceData={{id, description, rate, hours}}
                deleteFunc={() => deleteRow(invoice.id)}
                />
        )
    });

    //create a function that will add a "row" to currentData
    const addRow = async () => {
      const response = await axios.post("/invoice/add", { 
        description: "Enter Description Here"
      })
        //add this new row to currentData with it's state-setter-function
        setCurrentData([...currentData, response.data.newInvoice])
    }

    //delete function needs to get the row's id and then find that entry in currentData and remove it!! (and use the setCurrentData)
    // const filteredList = currentData.filter((invoice) => invoice.id !== id)
    // //update currentData to be filteredList
    // setCurrentData(filteredList)
    // // make a new array from currentData that filters out the entry whose id matches the id argument here
    
    const deleteRow = (id) => {
        //Send a DELETE request to our server
        axios.delete(`/invoice/delete/${id}`)
          .then((res) => {

            if (res.data.status) {
                const filteredList = currentData.filter((invoice) => {
                    return invoice.id !== id
                })
    
                setCurrentData(filteredList)

            } else {
                console.log("Something aint working right :((")
            }
            
          })   
    }


  return (
    <div>
        <table>
            <thead>
                <TableHeader />
            </thead>

            <tbody>
                {rows}
            </tbody>

            <tfoot>
                <AddButton addRow={addRow} />
            </tfoot>
        </table>
    </div>
  )
}

export default InvoiceTable