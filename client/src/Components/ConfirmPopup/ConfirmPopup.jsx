const ConfirmPopup = ({ onDelete, id, setDeleteEmployee, setDeleteEquipment }) => {
  return (
    <div>
      Are you sure?
      <button
        onClick={() => {
          setDeleteEmployee ? setDeleteEmployee(null) : setDeleteEquipment(null);
          onDelete(id);
        }}
      >
        Delete
      </button>
      <button onClick={() => setDeleteEmployee ? setDeleteEmployee(null) : setDeleteEquipment(null)}>Cancel</button>
    </div>
  );
};

export default ConfirmPopup;
