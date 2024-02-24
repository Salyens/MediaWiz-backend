function updateImgURLs(obj, newImgPath) {
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      updateImgURLs(obj[key], newImgPath);
    } else if (key === "imgURL") {
      obj[key] = newImgPath;
    }
  }
}
module.exports = updateImgURLs;
