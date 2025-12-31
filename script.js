
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

  loadLeads();
}

async function loadLeads() {
  const res = await fetch(API + "/leads");
  const leads = await res.json();

  const table = document.getElementById("table");
  table.innerHTML = "";

  leads.forEach(l => {
    table.innerHTML += `
      <tr>
        <td>${l.age}</td>
        <td>${l.income}</td>
        <td>${l.source}</td>
        <td>${l.score}</td>
        <td>${l.category}</td>
      </tr>
    `;
  });
}

loadLeads();