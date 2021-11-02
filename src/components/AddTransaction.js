import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const AddTransaction = () => {
  return (
    <>
      <button className="btn-addtransation">
        <FontAwesomeIcon icon={faPlusCircle} />
        Dodaj
      </button>
    </>
  );
};
