export const isValidNcellNumber = (phoneNumber: string): boolean => {
  if (!validNumber(phoneNumber)) return false
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

export const bgnLinearGradientClass =
  'bg-[linear-gradient(90deg,_#f04e23_0%,_#f04e23_10%,_#f26322_30.55%,_#f6871f_76.87%,_#f7941d_99.95%,_#f7941d_100%)]'
