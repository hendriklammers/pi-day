const ws = new WebSocket('ws://localhost:3000/pi')

document.body.innerHTML = '3.'

ws.addEventListener('message', ({ data }) => {
  const { value, index } = JSON.parse(data)
  document.body.innerHTML += value
})
