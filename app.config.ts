export default defineAppConfig({
  api: 'http://localhost:8080/api',
  // api: 'http://backend:8080/api', TODO: activate
  ui: {
    primary: 'sky',
    gray: 'cool',
    tooltip: {
      default: {
        openDelay: 500
      }
    }
  }
})
