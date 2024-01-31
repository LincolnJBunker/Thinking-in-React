import ModeButtons from './ModeButtons';
import DescriptionCell from './DescriptionCell';
import HoursCell from './HoursCell';
import RateCell from './RateCell';
import formatCurreny from '../utils/formatCurrency.js'

function TableRow({ initialIsEditing, initialInvoiceData }) {

  const { description, rate, hours } = initialInvoiceData
  
  return (
    <tr>
      <ModeButtons isEditing={initialIsEditing} />
      <DescriptionCell isEditing={initialIsEditing} value={description} />
      <RateCell isEditing={initialIsEditing} value={rate} />
      <HoursCell isEditing={initialIsEditing} value={hours} />
      <td>{ formatCurreny(rate * hours) }</td>
    </tr>
  )
}

export default TableRow