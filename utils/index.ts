export const isValidNcellNumber = (phoneNumber: string): boolean => {
  if (!validNumber(phoneNumber)) return false

  // remove this
  return true

  const cleanedNumber = phoneNumber.replace(/\D/g, '')
  if (cleanedNumber.length !== 10) {
    return false
  }

  // Check if the number starts with Ncell prefixes (980, 981, 982)
  const validPrefixes = ['980', '981', '982']
  return validPrefixes.some(prefix => cleanedNumber.startsWith(prefix))
}

const validNumber = (phoneNumber: string) => {
  return /^9\d{9}$/.test(phoneNumber)
}

export const linearGradientClass =
  'bg-[linear-gradient(90deg,_#221e67_0%,_#5e1f70_24.95%,_#7a2976_48.4%,_#a3387d_82.83%,_#b63f81_100%)]'
