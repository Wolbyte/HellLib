export function enToFaDigit(s) {
  return s.replace(/[\u0030-\u0039]/g, function (a) {
    return String.fromCharCode(0x6f0 | a.charCodeAt(0));
  });
}

export function faToEnDigit(s) {
  return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (a) {
    return a.charCodeAt(0) & 0xf;
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

export function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
