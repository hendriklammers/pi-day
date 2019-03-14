const ws = new WebSocket('ws://localhost:3000/pi')

ws.addEventListener('open', () => ws.send('Hello from client'))

ws.addEventListener('message', event => console.log(event))
