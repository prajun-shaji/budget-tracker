import { Modal, Button, Stack } from "react-bootstrap"
import { useBudget } from "../context/BudgetContext"
import { currencyFormatter } from "../App"

export default function ViewExpenses({ budgetId, handleClose }) {
  const { getBudgetExpense, budgets, deleteBudget, deleteExpense } =
    useBudget()

  const expenses = getBudgetExpense(budgetId)
  const budget = budgets.find(b => b.id === budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
        
              <Button
                onClick={() => {
                  deleteBudget(budget)
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}