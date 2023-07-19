export function TitleCase(stringToConvert) {
  /* check if the string provided has dot present or not */
  /* if the string contains a dot then the function will ignore all characters before dot (.) and then proceed */

  return stringToConvert
    ?.toLowerCase()
    ?.replaceAll("_", " ")
    ?.split(" ")
    ?.map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
    ?.join(" ");
}

export default TitleCase;
