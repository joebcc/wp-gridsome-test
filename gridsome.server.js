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
      
  })

  api.createManagedPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`{
      allPosts {
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
            acf {
              test
            }
          }
        }
      }
    }`)

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
    data.allPosts.edges.forEach(({ node }) => {
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
  })
}
