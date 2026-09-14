import sanitize from "sanitize-html";

export function sanitizeInput(obj) {
  const keys = Object.keys(obj);
  let data = {};
  keys.forEach((key) => {
    data[key] = sanitize(obj[key], {
      allowedTags: ["p"],
      allowedAttributes: {},
    });
  });
  return data;
}
