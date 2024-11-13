export const sanitizerConfig = {
  b: false,
  a: {
    href: true
  },
  i: true,
  p: {},
  div: {}
};
export function getRandomId() {
  var length = 12,
    charset = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}