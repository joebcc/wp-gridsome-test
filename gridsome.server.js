// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const fs = require('fs');
const axios = require('axios');

module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
      const { data: posts } = await axios.get('https://sisense.com/wp-json/wp/v2/posts?per_page=100');
      const { data: pages } = await axios.get('https://sisense.com/wp-json/wp/v2/pages?per_page=100');

      const collection = addCollection('Post')
      const pageCollection = addCollection('Pages')

      for (const item of posts) {
        collection.addNode({
          id: item.id,
          title: item.title.rendered,
          slug: item.slug,
          date: item.date,
          content: item.content.rendered
        })
      }
      for (const item of pages) {
        pageCollection.addNode({
          id: item.id,
          title: item.title.rendered,
          slug: item.slug,
          date: item.date,
          content: item.content.rendered
        })
      }
  })

  api.createManagedPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allPost {
        edges {
          node {
            id
            slug
            title
            content
          }
        }
      }
      allPages {
        edges {
          node {
            id
            slug
            title
            content
          }
        }
      }
    }`)

    data.allPost.edges.forEach(({ node }) => {
      createPage({
        path: `/posts/${node.slug}`,
        component: './src/components/SinglePost.vue',
        context: {
          slug: node.slug,
          title: node.title,
          content: node.content,
        }
      })
    })
    data.allPages.edges.forEach(({ node }) => {
      createPage({
        path: `/pages/${node.slug}`,
        component: './src/components/SinglePage.vue',
        context: {
          slug: node.slug,
          title: node.title,
          content: node.content,
          acf: node.acf,
        }
      })
    })
  })
}
