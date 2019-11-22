
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: '企服平台',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '企服平台' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],

  router: {
    middleware: ['needLogin']
  },
  proxy:{
    "/api" : {
      "target" : "http://313.shenzhenbenwo.com",
      "changeOrigin" : true,
      "ws" : false,
      "secure" : true,
      "pathRewrite" : {
          "/api" : "/"
      }
    }
  },
  axios: {

    proxy: true

  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
