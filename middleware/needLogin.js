export default function ({ route, store, req, res, redirect }) {
  const whiteList = ['info','aboutus', 'index', 'login', 'good', 'register', 'help']
  const routePath = route.name
  console.log('routePath',routePath)
  if (!whiteList.some(link => routePath.includes(link)) && !store.getters.is_login) {
    return redirect('/login?redirect=' + encodeURIComponent(route.fullPath))
  }
  return true
}