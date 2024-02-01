import ModeButtons from './ModeButtons';
import DescriptionCell from './DescriptionCell';
import HoursCell from './HoursCell';
import RateCell from './RateCell';
import formatCurreny from '../utils/formatCurrency.js';
import { useState } from 'react';

function TableRow({ initialIsEditing, initialInvoiceData, deleteFunc }) {
  // const { description, rate, hours } = initialInvoiceData
  
  const [editMode, setEditMode] = useState(initialIsEditing);
  const [description, setDescripton] = useState(initialInvoiceData.description);
  const [rate, setRate] = useState(initialInvoiceData.rate);
  const [hours, setHours] = useState(initialInvoiceData.hours);

  const makeEditMode = () => setEditMode(true); // ? true : false
  const makeNormalMode = () => setEditMode(false);
  
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