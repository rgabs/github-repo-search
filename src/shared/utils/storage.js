export default {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, val) => Promise.resolve(localStorage.setItem(key, val))
}