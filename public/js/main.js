console.log('working')


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageThree = document.querySelector('#message-three')





weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let location = searchElement.value

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  messageThree.textContent = '';

  fetch(`http://localhost:3000/weather?adress=${location}`).then((response) => {

    response.json().then((data) => {
      if (data.error) {
        //this makes the p have the text input of the error
        messageOne.textContent = data.error;
      } else {

        messageOne.textContent = `Location: ${data.location}`
        messageTwo.textContent = `Temperature: ${data.temperature.toFixed(1)}ºC`
        messageThree.textContent = `Precipitation: ${data.precipitation.toFixed(1)}%`

      }
    })
  })
})