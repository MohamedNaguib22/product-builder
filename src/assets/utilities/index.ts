export const textCut = (text:string, length = 50) => {
  if (text.length > 50) {
    return text.slice(0, length) + `.........`;
  } else {
    return text;
  }
};