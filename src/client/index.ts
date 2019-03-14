const ws = new WebSocket('ws://localhost:3000/pi')

ws.addEventListener('message', event => console.log(event.data))
