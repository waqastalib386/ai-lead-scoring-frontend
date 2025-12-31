
const API_BASE = "https://ai-lead-scoring-backend.onrender.com";

const tableBody = document.getElementById("table");
const scoreEl = document.getElementById("score");
const categoryEl = document.getElementById("category");

async function loadLeads() {
    const res = await fetch(`${API_BASE}/leads`);
    const data = await res.json();

    tableBody.innerHTML = "";

    data.forEach(lead => {
        const row = `
            <tr>
                <td>${lead.age}</td>
                <td>${lead.income}</td>
                <td>${lead.source}</td>
                <td>${lead.score}</td>
                <td>${lead.category}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

async function predictLead() {
    const age = document.getElementById("age").value;
    const income = document.getElementById("income").value;
    const source = document.getElementById("source").value;
    const time_spent = document.getElementById("time_spent").value;
    const pages_visited = document.getElementById("pages_visited").value;

    const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            age: Number(age),
            income: Number(income),
            source,
            time_spent: Number(time_spent),
            pages_visited: Number(pages_visited)
        })
    });

    const result = await res.json();

    scoreEl.innerText = result.score;
    categoryEl.innerText = result.lead_category;

    loadLeads(); // 🔥 MOST IMPORTANT LINE
}

window.onload = loadLeads;