export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    throw new Error("String is empty");
  }

  if (str.length === 1) {
    return str.toUpperCase();
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}
