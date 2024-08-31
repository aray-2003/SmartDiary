const dateField = document.getElementById('date')
const quoteField = document.getElementById('quote')



function updateDate() {
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    dateField.textContent = formattedDate;
}

updateDate(); // Call initially
setInterval(updateDate, 1000); // Update every second

// Function to fetch and display a random quote
async function displayRandomQuote() {
    try {
      const response = await fetch('quotes.txt');
      const text = await response.text();
      const quotes = text.split('\n').filter(quote => quote.trim() !== ''); // Split into lines and remove empty lines
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      quoteField.textContent = randomQuote;
    } catch (error) {
      console.error('Error fetching or displaying quote:', error);
      // Handle the error appropriately (e.g., display an error message)
    }
  }
  
  displayRandomQuote(); // Call initially to display a quote
