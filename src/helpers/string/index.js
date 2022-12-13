
const safeString = (str, { lowerCase = false }) => {
  let safeStr = String(str)
  if (lowerCase) safeStr = safeStr.toLowerCase()
  return safeStr
}

const safeEmail = (email) => {
  if (!email) return ''
  const lowerCase = email.toLowerCase().trim()
  if (lowerCase.includes('+')) {
    return (
      lowerCase.substring(0, lowerCase.indexOf('+')) + lowerCase.substring(lowerCase.indexOf('@'), lowerCase.length)
    )
  }
  return lowerCase
}

export default {
  safeString,
  safeEmail
}
