const userInput = document.getElementById('userInput');
const userContainer = document.getElementById('userContainer');
const userEnter = document.getElementById('userEnter');

const profileIcon = document.getElementById('profile')
const enterIcon = document.getElementById('enter')

//when userInput is focused
userInput.addEventListener('focus', (event) => {
  //hide profile icon
  profileIcon.style.display = 'none';

  //show enter icon
  enterIcon.style.display = 'flex';
});

//when userInput is out of focus
userInput.addEventListener('blur', (event) => {
  //show profile icon
  profileIcon.style.display = 'flex';

  //show enter icon
  enterIcon.style.display = 'none';
});


//When enter is pressed
userInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    //sets value of input to userEnter header
    let value = userInput.value
    userEnter.innerText = value;
      
    //hides inputbox
    userContainer.style.visibility = 'hidden';
  }
});



      