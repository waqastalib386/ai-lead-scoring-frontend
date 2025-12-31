
const API = "https://ai-lead-scoring-backend.onrender.com";

async function predictLead() {
  const payload = {
    age: Number(document.getElementById("age").value),
    income: Number(document.getElementById("income").value),
    source: document.getElementById("source").value,
    time_spent: Number(document.getElementById("time_spent").value),
    pages_visited: Number(document.getElementById("pages_visited").value)
  };

  const res = await fetch(API + "/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  document.getElementById("score").innerText = data.score;
  document.getElementById("category").innerText = data.lead_category;

  addRow(payload, data);
}

function addRow(payload, data) {
  const table = document.getElementById("table");

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${payload.age}</td>
    <td>${payload.income}</td>
    <td>${payload.source}</td>
    <td>${data.score}</td>
    <td>${data.lead_category}</td>
  `;

  table.prepend(row);
}