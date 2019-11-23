export default async function ({ route, store, req, res, redirect }) {
  const whiteList = ['info','aboutus', 'index', 'login', 'good', 'register', 'help']
  const routePath = route.name
  if(!store.getters.is_login){
    if(!whiteList.some(link => routePath.includes(link))){
      if(localStorage.getItem('token')){
        try{
          await store.dispatch('asyncCheckLogin')
        }catch(e){
          redirect('/login?redirect=' + encodeURIComponent(route.fullPath))
        }
      }else{
        return redirect('/login?redirect=' + encodeURIComponent(route.fullPath))
      }
    }else{
      return true
    }
    // if(!localStorage.getItem('token')){
    //   let await this.store.dispatch('asyncCheckLogin')
    // }else{

    // }
  }else{
    return true
  }
}