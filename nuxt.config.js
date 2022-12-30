export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Design Tokens Generator",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      { name: "canonical", content: "https://tokens.layoutit.com" },
      {
        hid: "description",
        name: "description",
        content:
          "Quickly create Design System tokens and get JSON, CSS and SASS code. Use our Design Tokens generator to quickstart your next project!",
      },
      {
        hid: "author",
        name: "author",
        content: "Leniolabs_ LLC",
      },

      { name: "og:type", content: "website" },
      { name: "og:url", content: "https://tokens.layoutit.com" },
      { name: "og:title", content: "Design Tokens Generator" },
      {
        name: "og:description",
        content:
          "Quickly create Design System tokens and get JSON, CSS and SASS code. Use our Design Tokens generator to quickstart your next project!",
      },
      {
        name: "og:image",
        content: "https://tokens.layoutit.com/meta-image.png",
      },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://tokens.layoutit.com" },
      { name: "twitter:title", content: "Design Tokens Generator" },
      {
        name: "twitter:description",
        content:
          "Quickly create Design System tokens and get JSON, CSS and SASS code. Use our Design Tokens generator to quickstart your next project!",
      },
      { name: "twitter:image", content: "https://tokens.layoutit.com/meta-image.png" },
      { name: "twitter:creator", content: "Leniolabs_ LLC" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/gtag.js" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["nuxt-highlightjs"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
