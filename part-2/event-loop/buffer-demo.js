
const buff1 = Buffer.alloc(10)
console.log(buff1)


const buffFromStream = Buffer.from("stream")

console.log(buffFromStream)


const buffFromArrOfInt = Buffer.from([1,2,3,4,5])

console.log(buffFromArrOfInt)


buff1.write('Temidayo')

console.log(`After writing node js to buff1`, buff1.toString())


console.log(buffFromStream[0])

console.log(buffFromStream.subarray(0, 3))


const concatBuffs = Buffer.concat([buff1, buffFromStream] )

console.log(concatBuffs)

console.log(concatBuffs.toJSON())
