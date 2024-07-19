const ConfirmPopup = ({ onDelete, id, setDeleteEmployee }) => {
  return (
    <div>
      Are you sure?
      <button
        onClick={() => {
          setDeleteEmployee(null);
          onDelete(id);
        }}
      >
        Delete
      </button>
      <button onClick={() => setDeleteEmployee(null)}>Cancel</button>
    </div>
  );
};

export default ConfirmPopup;
