const userInput = document.getElementById('userInput');
const userEnter = document.getElementById('userEnter');

      userInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            let value = userInput.value
            userEnter.innerText = value;
            
            userInput.style.display = 'none';
            userEnter.style.display = 'block';
        }
      }, 500);