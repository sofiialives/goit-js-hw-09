function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  const dataStart = document.querySelector('[data-start]')
  const dataStop = document.querySelector('[data-stop]')

  let timeId = null

  dataStart.addEventListener('click', () => {
    timeId = setInterval(() =>{
       document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    dataStart.disabled = true;
    dataStop.disabled = false;
});

dataStop.addEventListener('click', () =>{
    clearInterval(timeId)
    dataStart.disabled = false;
    dataStop.disabled = true;
});

