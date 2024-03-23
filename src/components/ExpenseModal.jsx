import { useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudget } from "../context/BudgetContext";

export default function ExpenseModal({ defaultBudgetId, show, handleClose }) {
  const budgetIdRef = useRef();
  const noteRef = useRef();
  const amountRef = useRef();
  const { addExpense, budgets } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      note: noteRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4" controlId="note">
            <Form.Label>Note</Form.Label>
            <Form.Control ref={noteRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-4" controlId="amount">
            <Form.Label>Amount spent</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={0.01}
              required
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="budgetId">
            <Form.Label>Category</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button type="submit">Save</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
