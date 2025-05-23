export const isValidNcellNumber = (phoneNumber: string): boolean => {
  if(!validNumber(phoneNumber)) return false

  // remove this 
  return true

  const cleanedNumber = phoneNumber.replace(/\D/g, '');
  if (cleanedNumber.length !== 10) {
    return false;
  }

  // Check if the number starts with Ncell prefixes (980, 981, 982)
  const validPrefixes = ['980', '981', '982'];
  return validPrefixes.some(prefix => cleanedNumber.startsWith(prefix));
};

const validNumber = (phoneNumber: string) => {
  return /^9\d{9}$/.test(phoneNumber)
}