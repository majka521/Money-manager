import { SectionOfNewOrEditTransaction } from "./SectionOfNewOrEditTransaction";
export const EditTransaction = ({ showEditTransactionForm, setShowEditTransactionForm, setDatabase }) => {
  console.log();

  return <>{showEditTransactionForm === true && <SectionOfNewOrEditTransaction setShowNewTransactionForm={setShowEditTransactionForm} />}</>;
};
