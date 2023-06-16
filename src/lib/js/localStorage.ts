export default {
  get(name: string) {
    return localStorage.getItem(name)
  },
  set(name: string, value: string) {
    localStorage.setItem(name, value)
  },
  remove(name: string) {
    localStorage.removeItem(name)
  },
  clear() {
    localStorage.clear()
  }
}
