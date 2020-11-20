// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios');

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
      const { data } = await axios.get('http://joebcc.com/index.php/wp-json/wp/v2/posts');

      const collection = addCollection('Post')

      for (const item of data) {
        collection.addNode({
          id: item.id,
          title: item.title.rendered,
          slug: item.slug,
          date: item.date,
          content: item.content.rendered
        })
      }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
