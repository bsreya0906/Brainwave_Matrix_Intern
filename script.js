let storedExpenses = localStorage.getItem("expenses");
let expenseList = storedExpenses ? JSON.parse(storedExpenses) : [];

function updateTotal() {
  let total = 0;
  for (let i = 0; i < expenseList.length; i++) {
    total = total + expenseList[i].amount;
  }
  document.getElementById("total").innerText = total.toFixed(2);
}

function addExpense() {
  let name = document.getElementById("name").value;
  let amountText = document.getElementById("amount").value;
  let category = document.getElementById("category").value;

  let amount = Number(amountText);
  let date = new Date().toLocaleString();

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Enter a valid name and amount");
    return;
  }

  let expense = {
    id: new Date().getTime(),
    name: name,
    amount: amount,
    category: category,
    date: date
  };

  expenseList.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenseList));

  showExpenses();
  updateTotal();
  clearForm();
}

function deleteExpense(idToDelete) {
  let newList = [];

  for (let i = 0; i < expenseList.length; i++) {
    if (expenseList[i].id !== idToDelete) {
      newList.push(expenseList[i]);
    }
  }

  expenseList = newList;
  localStorage.setItem("expenses", JSON.stringify(expenseList));

  showExpenses();
  updateTotal();
}

function clearAll() {
  let sure = confirm("Delete all expenses?");
  if (sure) {
    localStorage.removeItem("expenses");
    expenseList = [];
    showExpenses();
    updateTotal();
  }
}

function showExpenses() {
  let list = document.getElementById("expense-list");
  list.innerHTML = "";

  for (let i = 0; i < expenseList.length; i++) {
    let item = document.createElement("li");

    item.innerHTML = `
      <div>
        <strong>${expenseList[i].name}</strong> - ₹${expenseList[i].amount} (${expenseList[i].category})<br>
        <small>${expenseList[i].date}</small>
      </div>
      <button class="delete-btn" onclick="deleteExpense(${expenseList[i].id})">Delete</button>
    `;

    list.appendChild(item);
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "Food";
}

showExpenses();
updateTotal();
