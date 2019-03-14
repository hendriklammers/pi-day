const ws = new WebSocket('ws://localhost:3000/pi')

let digits = localStorage.getItem('pi_digits') || ''

const h1 = document.createElement('h1')
document.body.appendChild(h1)
h1.innerHTML = '3.'

ws.addEventListener('open', () => {
  const index = localStorage.getItem('pi_index') || 0
  ws.send(JSON.stringify({ index }))
})

ws.addEventListener('message', ({ data }) => {
  const { value, index } = JSON.parse(data)
  digits += value
  // h1.innerHTML = '3.' + digits
  localStorage.setItem('pi_index', index)
  localStorage.setItem('pi_digits', digits)
})
