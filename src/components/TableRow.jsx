import ModeButtons from './ModeButtons';
import DescriptionCell from './DescriptionCell';
import HoursCell from './HoursCell';
import RateCell from './RateCell';
import formatCurreny from '../utils/formatCurrency.js';
import { useState } from 'react';
import axios from 'axios';

function TableRow({ initialIsEditing, initialInvoiceData, deleteFunc }) {
  // const { description, rate, hours } = initialInvoiceData
  
  const [editMode, setEditMode] = useState(initialIsEditing);
  const [description, setDescripton] = useState(initialInvoiceData.description);
  const [rate, setRate] = useState(initialInvoiceData.rate);
  const [hours, setHours] = useState(initialInvoiceData.hours);

  const makeEditMode = () => setEditMode(true); // ? true : false
  const makeNormalMode = () => {
    //this function now needs to submit an axios.put request to the server
    //submitting as the body of the request, the rate, hours, and description --> 
    //those are already being saved as state varialble^^
    //In a put request, i know i need a body object. so imma make once in advance for
    //readabiltyy of this func
    const bodyObj = {
      description: description,
      rate: rate,
      hours: hours
    }
    //send the body obj and an id as a param to the server with axios
    axios.put(`/invoice/update/${initialInvoiceData.id}`, bodyObj)
      .then((res) => {
        setEditMode(false)
      })
  }
  
  return (
    <tr>
      <ModeButtons 
      isEditing={editMode}
      saveClick={makeNormalMode}
      editClick={makeEditMode}
      deleteFunc={deleteFunc}
      />
      <DescriptionCell 
      isEditing={editMode} 
      value={description}
      onValueChange={setDescripton}
      />
      <RateCell 
      isEditing={editMode} 
      value={rate}
      onValueChange={setRate}
      />
      <HoursCell 
      isEditing={editMode} 
      value={hours}
      onValueChange={setHours}
      />
      <td>{ formatCurreny(rate * hours) }</td>
    </tr>
  )
}

export default TableRow