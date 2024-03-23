import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../App";

export default function BudgetCard({
  defaultBg,
  name,
  amount,
  max,
  hideButtons,
  onAddExpense,
  onViewExpenses,
}) {
  const cardBg = [];
  if (amount > max) {
    cardBg.push("bg-danger", "bg-opacity-10");
  } else if (defaultBg) {
    cardBg.push("bg-light");
  }

  function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < 0.5) return "success";
    if (ratio < 0.8) return "warning";
    return "danger";
  }

  return (
    <Card className={cardBg.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(max)}
              </span>
            )}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill mb-4"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2">
            <Button
              variant="outline-danger"
              className="ms-auto"
              onClick={onAddExpense}
            >
              Add Expense
            </Button>
            <Button variant="outline-primary" onClick={onViewExpenses}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
