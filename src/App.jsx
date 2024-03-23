import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useBudget } from "./context/BudgetContext";
import BudgetCard from "./components/BudgetCard";
import BudgetModal from "./components/BudgetModal";
import ExpenseModal from "./components/ExpenseModal";
import TotalBudget from "./components/TotalBudget";
import ViewExpenses from "./components/ViewExpenses";

export const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "usd",
  minimumFractionDigits: 0,
});

export default function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [viewExpensesModal, setViewExpensesModal] = useState();
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();
  const { budgets, getBudgetExpense } = useBudget();

  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true);
    setAddExpenseBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack className="mb-4" direction="horizontal" gap="2">
          <h1 className="me-auto">Budget Tracker</h1>
          <Button variant="success" onClick={() => setShowBudgetModal(true)}>
            New Budget
          </Button>
          <Button variant="outline-danger" onClick={openAddExpenseModal}>
            New Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            alignItems: "flex-start",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpense(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpense={() => openAddExpenseModal(budget.id)}
                onViewExpenses={() => setViewExpensesModal(budget.id)}
              />
            );
          })}
          <TotalBudget />
        </div>
      </Container>
      <BudgetModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      />
      <ExpenseModal
        show={showExpenseModal}
        defaultBudgetId={addExpenseBudgetId}
        handleClose={() => setShowExpenseModal(false)}
      />
      <ViewExpenses
        budgetId={viewExpensesModal}
        handleClose={() => setViewExpensesModal()}
      />
    </>
  );
}
