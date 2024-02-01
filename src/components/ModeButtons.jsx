function ModeButtons({ isEditing, saveClick, editClick }) {

  return isEditing ? (
    <td>
        <button onClick={saveClick}>Save</button>
    </td>
  ) : (
    <td>
        <button>Delete</button>
        <button onClick={editClick}>Edit</button>
    </td>
  )
}

export default ModeButtons