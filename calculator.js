// Initialize variables
let results = [];
let totalEntries = 5; // Define how many total entries are allowed

// Display progress and main table container
const outputDiv = document.getElementById("calculator-output");
outputDiv.innerHTML += "<table id='results-table'><tr><th>Number 1</th><th>Operator</th><th>Number 2</th><th>Result</th></tr></table>";

const resultsTable = document.getElementById("results-table");

let entryCount = 0;

do {
    entryCount++;
    // Prompt user for inputs
    let x = prompt(`(${entryCount}/${totalEntries}) Enter the first number:`);
    if (x === null) break;

    let y = prompt(`(${entryCount}/${totalEntries}) Enter the second number:`);
    if (y === null) break;

    let operator = prompt(`(${entryCount}/${totalEntries}) Enter an operator (+, -, *, /, %):`);
    if (operator === null) break;

    x = parseFloat(x);
    y = parseFloat(y);
    let result;

    // Validate inputs and calculate result
    if (isNaN(x) || isNaN(y)) {
        result = "Error: Non-numeric input!";
    } else {
        switch (operator) {
            case '+':
                result = x + y;
                break;
            case '-':
                result = x - y;
                break;
            case '*':
                result = x * y;
                break;
            case '/':
                result = y !== 0 ? x / y : "Error: Division by zero!";
                break;
            case '%':
                result = x % y;
                break;
            default:
                result = "Error: Invalid operator!";
        }
    }

    // Display the result in the table
    const row = resultsTable.insertRow();
    row.innerHTML = `<td>${isNaN(x) ? "Invalid Input" : x}</td><td>${operator}</td><td>${isNaN(y) ? "Invalid Input" : y}</td><td>${result}</td>`;

    // Store valid results
    if (typeof result === "number") {
        results.push(result);
    }

    // Update progress
    outputDiv.querySelector("h2").textContent = `Progress: ${entryCount}/${totalEntries} calculations completed`;

} while (entryCount < totalEntries && confirm("Do you want to continue to the next calculation?"));

// After loop ends, generate summary table
if (results.length > 0) {
    const min = Math.min(...results);
    const max = Math.max(...results);
    const avg = results.reduce((a, b) => a + b, 0) / results.length;
    const total = results.reduce((a, b) => a + b, 0);

    outputDiv.innerHTML += `<table class="summary-table">
        <tr><th>Minimum</th><th>Maximum</th><th>Average</th><th>Total</th></tr>
        <tr><td>${min}</td><td>${max}</td><td>${avg.toFixed(2)}</td><td>${total}</td></tr>
    </table>`;
} else {
    outputDiv.innerHTML += "<p>No valid results to summarize.</p>";
}
