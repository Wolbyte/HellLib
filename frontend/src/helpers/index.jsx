export function enToFaDigit(s) {
  return s.replace(/[\u0030-\u0039]/g, function (a) {
    return String.fromCharCode(0x6f0 | a.charCodeAt(0));
  });
}
