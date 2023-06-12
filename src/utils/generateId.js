export const generateId = (siblings, uniqueProperty) => {
  for (; ;) {
    let id = Math.floor(Math.random() * 900000) + 100000;
    if (!siblings.find((item) => item[uniqueProperty] === id)) {
      return id;
    }
  }
};
