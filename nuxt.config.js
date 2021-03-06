const pkg = require('./package')

const {getConfigForKeys} = require('./lib/config.js')
const ctfConfig = getConfigForKeys([
  'CTF_PERSON_ID',
  'CTF_BLOG_ID',
  'CTF_SPACE_ID',
  'CTF_CDA_ACCESS_TOKEN'
])

const {createClient} = require('./plugins/contentful')
const cdaClient = createClient(ctfConfig)

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
    CTF_SPACE_ID: ctfConfig.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: ctfConfig.CTF_CDA_ACCESS_TOKEN,
    CTF_PERSON_ID: ctfConfig.CTF_PERSON_ID,
    CTF_BLOG_ID: ctfConfig.CTF_BLOG_ID,
  },
  generate: {
    // routes() {
    //   return Promise.all([
    //     cdaClient.getEntries({
    //       content_type: config.CTF_BLOG_ID,
    //     }),
    //     // client.getEntries({
    //     //   content_type: config.CTF_CATEGORY_ID,
    //     // }),
    //   ])
    //     .then(([posts, categories]) => [
    //       ...posts.items.map(post => `articles/${post.fields.id}`),
    //       // ...categories.items.map(category => `articles/category/${category.fields.slug}`),
    //     ]);
    // },
    routes() {
      return cdaClient
        .getEntries(ctfConfig.CTF_BLOG_POST_TYPE_ID)
        .then(posts => {
          return [...posts.items.map(post => `articles/${post.fields.id}`)]
        })
    }
  }
}
