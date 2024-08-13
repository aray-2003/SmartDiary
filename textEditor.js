const dateField = document.getElementById('date')

const currentDate = new Date();

function updateDate() {
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    dateField.textContent = formattedDate;
}

updateDate(); // Call initially
setInterval(updateDate, 1000); // Update every second

dateField.innerText = formattedDate
