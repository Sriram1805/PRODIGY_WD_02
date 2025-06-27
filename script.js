const admin = {
  username: "admin",
  password: "1234",
};

let employees = [];
let editingIndex = null;

function login() {
  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value.trim();
  const errorText = document.getElementById("login-error");

  if (username === admin.username && password === admin.password) {
    errorText.style.color = "lightgreen";
    errorText.textContent = "Login successful!";
    
    // Show dashboard, hide login
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    // Reset fields
    document.getElementById("admin-username").value = "";
    document.getElementById("admin-password").value = "";
    errorText.textContent = "";
  } else {
    errorText.style.color = "#ffdddd";
    errorText.textContent = "Invalid username or password.";
  }
}

function logout() {
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("login-section").classList.remove("hidden");
}

document.getElementById("employee-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("emp-name").value.trim();
  const role = document.getElementById("emp-role").value.trim();
  const email = document.getElementById("emp-email").value.trim();

  if (!name || !role || !email) {
    alert("Please fill in all fields.");
    return;
  }

  const employee = { name, role, email };

  if (editingIndex !== null) {
    employees[editingIndex] = employee;
    editingIndex = null;
  } else {
    employees.push(employee);
  }

  this.reset();
  renderTable();
});

function renderTable() {
  const tbody = document.getElementById("employee-table-body");
  tbody.innerHTML = "";

  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.role}</td>
      <td>${emp.email}</td>
      <td>
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editEmployee(index) {
  const emp = employees[index];
  document.getElementById("emp-name").value = emp.name;
  document.getElementById("emp-role").value = emp.role;
  document.getElementById("emp-email").value = emp.email;
  editingIndex = index;
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    renderTable();
  }
}
