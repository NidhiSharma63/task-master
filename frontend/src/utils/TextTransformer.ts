export function capitalizeFirstLetter(stringToConvert: string) {
  if (!stringToConvert || typeof stringToConvert !== 'string') {
    return '';
  }

  return stringToConvert.charAt(0).toUpperCase() + stringToConvert.slice(1);
}
