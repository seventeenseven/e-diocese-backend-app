const randomIntInc = (low, high) => Math.floor(Math.random() * (high - low + 1) + low)

export default codeLength => {
  const numbers = new Array(codeLength)

  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = randomIntInc(0, 9)
  }

  return numbers.join('')
}
