import './InvoiceTable.css';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import AddButton from './AddButton';
import { useState } from 'react';

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
                initialInvoiceData={{description, rate, hours}}
                deleteFunc={() => deleteRow(invoice.id)}
                />
        )
    });

    //create a function that will add a "row" to currentData
    const addRow = () => {
        //create a new empty object with id, description, rate, hours
        let newRow = {
            id: globalId, 
            description: "",
            rate: "",
            hours: "",
        }

        globalId++

        //add this new row to currentData with it's state-setter-function
        setCurrentData([...currentData, newRow])
    }

    //delete function needs to get the row's id and then find that entry in currentData and remove it!! (and use the setCurrentData)

    const deleteRow = (id) => {
        // make a new array from currentData that filters out the entry whose id matches the id argument here
        const filteredList = currentData.filter((invoice) => invoice.id !== id)
        //update currentData to be filteredList
        setCurrentData(filteredList)
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