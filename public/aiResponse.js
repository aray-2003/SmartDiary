const aiDisplay = document.getElementById('aiFeedback');
const star = document.getElementById('star');
const generateButton = document.getElementById('generate');
const textInput = document.getElementById('goals');
const aiResponseModal = document.querySelector('.modal'); 
const closeModalButton = document.getElementById('closeModal'); 
let generatedPlan = ''; // Store the generated plan globally



// Function to send a request to your server and get text from Gemini
async function getGeneratedText(prompt) {
  try {
    const response = await fetch(`${window.location.origin}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt })
    });

    if (!response.ok) { // Check for both network and HTTP errors
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    generatedPlan = data.generatedText; 
    return generatedPlan;

  } catch (error) {
    console.error('Error:', error);
    aiDisplay.textContent = 'Error'; // Display error
    star.classList.remove('loading'); // Stop loading animation
    return null; // Indicate failure
  }
}

// Example usage (connect this to a button or form submission):
 // Replace with your button's ID
         // Replace with your output area's ID

  generateButton.addEventListener('click', async () => {
  

  const userGoal = textInput.value;

    if (userGoal) {
      aiDisplay.classList.remove('clickable')
      aiDisplay.textContent = 'Generating';
    star.classList.add('loading');
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    const prompt = `You are an expert and soley a specialized AI agent that generates personalized schedules for users based on their input goals. It is currently ${formattedDate}, My goals are to ${userGoal}. Generate a concise, realistic and well laid-out schedule.`;
    const plan = await getGeneratedText(prompt);

    
 

    if (plan) { // Only proceed if plan was generated successfully
      aiDisplay.textContent = 'Complete';
      aiDisplay.classList.add('clickable');
      star.classList.remove('loading')

      var converter = new showdown.Converter(),
        text      = plan,
        html      = converter.makeHtml(text);
      
      generatedPlan = html

      aiResponseModal.classList.add('is-active');
      document.getElementById('aiResponse').innerHTML = html;
    } 
  } else {
    // Handle case where userGoal is empty
    aiDisplay.textContent = 'Write!';
    star.classList.remove('loading'); // Stop loading if no goal
  }
  });
        
    // Add event listener to aiDisplay to open the modal
  aiDisplay.addEventListener('click', () => {
    if (aiDisplay.textContent === 'Complete') {
      aiResponseModal.classList.add('is-active');
      document.getElementById('aiResponse').innerHTML = generatedPlan;
    }
  });
  
  // Close the modal
  closeModalButton.addEventListener('click', () => {
    aiResponseModal.classList.remove('is-active');
  });
