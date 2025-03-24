// timers -> pending callbacks -> idle, prepate -> poll -> check -> close callback
const fs = require("fs")
const crypto = require("crypto")

console.log('1. script start')
setTimeout(() => {
  console.log('2. settimeout 0s callback (macrotask)')
}, 0);
setTimeout(() => {
  console.log('3. settimeout 0s callback (macrotask)')
}, 0);
Promise.resolve().then(() => {
  console.log('5. Promise resolved (microtask)')
})

process.nextTick(() => {
  console.log('6, process.nextTick callback (microrask)')
})

fs.readFile(__filename, (err, data) => {
  console.log('7. fs.readFile callback (I/O callback)')
})

crypto.pbkdf2('secret', 'salt', 10000, 64, 'sha512', (err, key) => {
  if(err) throw err
  console.log('8. pbkdf2 intensive application run')
}
)
setImmediate(() => {
  console.log('4. setImmediate 0s callback (check)')
});
console.log('9. script ends')
