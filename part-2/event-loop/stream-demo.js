// readable -> read
// writeable -> write
// duplex
// transform

const fs = require('fs')
const zlib = require("zlib") //compression gzip
const crypto = require('crypto')
const {Transform} = require('stream')

class EncryptStream extends Transform {
  constructor(key, vector){
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callback) {
    const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector)
    const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()])
    this.push(encrypted)
    callback();
  }
}

const key = crypto.randomBytes(32)
const vector = crypto.randomBytes(16)

const readableStream = fs.createReadStream('input.txt')

// gzip compress

const gzipStream = zlib.createGzip()

const encryptStream = new EncryptStream(key, vector)

const writeableStream = fs.createWriteStream('output.txt.gz.enc')

// read -> compress -> encrypt -> write

readableStream.pipe(gzipStream).pipe(encryptStream).pipe(writeableStream)

console.log('read -> compress -> encrypt -> write')
