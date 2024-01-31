import formatCurrency from "../utils/formatCurrency"

function RateCell({ isEditing, value }) {
  return isEditing ? (
    <td>
        <input type="text" value={value} />
    </td>
  ) : (
    <td>{formatCurrency(value)}/hr</td>
  )
}

export default RateCell