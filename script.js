// Store debts in memory (array)
let debts = [];

// DOM elements
const debtForm = document.getElementById("debt-form");
const owedToMeTable = document
  .getElementById("owed-to-me-table")
  .querySelector("tbody");
const iOweTable = document.getElementById("i-owe-table").querySelector("tbody");
const totalOwedToMe = document.getElementById("total-owed-to-me");
const totalIOwe = document.getElementById("total-i-owe");
const debtCountOwedToMe = document.getElementById("debt-count-owed-to-me");
const debtCountIOwe = document.getElementById("debt-count-i-owe");

// Initialize the app
function init() {
  // Set today's date as default
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("date").value = today;

  // Sample data for testing
  // addDebt("John", 50, "owed-to-me", today);
  // addDebt("Sarah", 25, "i-owe", today);
}

// Render all debts in the tables
function renderDebts() {
  // Clear tables
  owedToMeTable.innerHTML = "";
  iOweTable.innerHTML = "";

  // Add each debt to the appropriate table
  debts.forEach((debt, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
              <td>${debt.name}</td>
              <td>$${debt.amount.toFixed(2)}</td>
              <td>${debt.date}</td>
              <td><button class="delete-btn" data-index="${index}">Delete</button></td>
          `;

    if (debt.type === "owed-to-me") {
      owedToMeTable.appendChild(row);
    } else {
      iOweTable.appendChild(row);
    }
  });

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = parseInt(this.getAttribute("data-index"));
      deleteDebt(index);
    });
  });
}

// Update the total amounts
function updateTotals() {
  const owedToMe = debts
    .filter((debt) => debt.type === "owed-to-me")
    .reduce((sum, debt) => sum + debt.amount, 0);

  const iOwe = debts
    .filter((debt) => debt.type === "i-owe")
    .reduce((sum, debt) => sum + debt.amount, 0);

  totalOwedToMe.textContent = `$${owedToMe.toFixed(2)}`;
  totalIOwe.textContent = `$${iOwe.toFixed(2)}`;

  // Update counts
  debtCountOwedToMe.textContent = debts.filter(
    (d) => d.type === "owed-to-me"
  ).length;
  debtCountIOwe.textContent = debts.filter((d) => d.type === "i-owe").length;
}

// Add a new debt
function addDebt(name, amount, type, date) {
  const newDebt = {
    name,
    amount: parseFloat(amount),
    type,
    date,
  };

  debts.push(newDebt);
  renderDebts();
  updateTotals();
}

// Delete a debt
function deleteDebt(index) {
  debts.splice(index, 1);
  renderDebts();
  updateTotals();
}

// Form submission
debtForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;

  addDebt(name, amount, type, date);

  // Reset form
  debtForm.reset();
  document.getElementById("date").value = new Date()
    .toISOString()
    .split("T")[0];
});

// Initialize the app
init();
