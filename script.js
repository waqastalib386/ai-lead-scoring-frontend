
const API_URL = "https://ai-lead-scoring-backend.onrender.com";

async function predictLead() {
  const data = {
    age: Number(document.getElementById("age").value),
    income: Number(document.getElementById("income").value),
    source: document.getElementById("source").value,
    time_spent: Number(document.getElementById("time_spent").value),
    pages_visited: Number(document.getElementById("pages_visited").value)
  };

  const res = await fetch(API_URL + "/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  document.getElementById("score").innerText = result.score;
  document.getElementById("category").innerText = result.lead_category;

  loadLeads();
}

async function loadLeads() {
  const res = await fetch(API_URL + "/leads");
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