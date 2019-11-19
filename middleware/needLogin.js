export default function ({ route, store, req, res, redirect }) {
  const whiteList = ['/','/login', '/good','/register']
  const routePath = route.path
  if (!whiteList.some(link => routePath.includes(link))  && !store.getters.is_login) {
    return redirect('/login?redirect=' + encodeURIComponent(route.fullPath))
  }
  return true

}