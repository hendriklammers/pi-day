const ws = new WebSocket('ws://localhost:3000/pi')

let pi = '3.'

const h1 = document.createElement('h1')
document.body.appendChild(h1)
h1.innerHTML = pi

ws.addEventListener('message', ({ data }) => {
  const { value, index } = JSON.parse(data)
  pi += value
  h1.innerHTML = pi
})
