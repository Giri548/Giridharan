let salary = 0;
let balance = 0;

function setSalary() {
  salary = parseFloat(document.getElementById("salary").value);
  balance = salary;
  document.getElementById("balance").innerText = "Balance: ₹" + balance;
}

function addExpense() {
  let name = document.getElementById("expenseName").value;
  let amount = parseFloat(document.getElementById("expenseAmount").value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense details.");
    return;
  }

  if (amount >   balance) {
    alert("Not enough balance!");
    return;
  }

  balance -= amount;

  let li = document.createElement("li");
  li.textContent = `${name} - ₹${amount}`;
  document.getElementById("expenseList").appendChild(li);

  document.getElementById("balance").innerText = "Balance: ₹" + balance;

  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}