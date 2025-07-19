let expenseList = JSON.parse(localStorage.getItem("expenses")) || [];

function updateTotal() {
  const total = expenseList.reduce((acc, exp) => acc + exp.amount, 0);
  document.getElementById("total").innerText = total.toFixed(2);
}

function addExpense() {
  const name = document.getElementById("name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = new Date().toLocaleString();

  if (!name || !amount || amount <= 0) {
    alert("Please enter valid name and amount");
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    category,
    date
  };

  expenseList.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenseList));

  renderList();
  updateTotal();
  clearForm();
}

function deleteExpense(id) {
  expenseList = expenseList.filter(e => e.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenseList));
  renderList();
  updateTotal();
}

function clearAll() {
  if (confirm("Are you sure you want to delete all expenses?")) {
    localStorage.removeItem("expenses");
    expenseList = [];
    renderList();
    updateTotal();
  }
}

function renderList() {
  const list = document.getElementById("expense-list");
  list.innerHTML = "";

  expenseList.forEach(exp => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div>
        <strong>${exp.name}</strong> - ₹${exp.amount} (${exp.category})<br>
        <small>${exp.date}</small>
      </div>
      <button class="delete-btn" onclick="deleteExpense(${exp.id})">Delete</button>
    `;
    list.appendChild(item);
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "Food";
}

renderList();
updateTotal();
