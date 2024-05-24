export function enToFaDigit(s) {
  return s.replace(/[\u0030-\u0039]/g, function (a) {
    return String.fromCharCode(0x6f0 | a.charCodeAt(0));
  });
}

export function faToEnDigit(s) {
  return s.replace(/[\u06f0-\u06f9]/g, function (a) {
    return String.fromCharCode(0xff & a.charCodeAt(0));
  });
}

export function getNestedKeys(obj, key) {
  if (key in obj) {
    return obj[key];
  }
  const keys = key.split(".");
  let value = obj;
  for (let i = 0; i < keys.length; i++) {
    value = value[keys[i]];
    if (value === undefined) {
      break;
    }
  }

  return value;
}
