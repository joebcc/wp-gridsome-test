<template>
  <Layout>

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/favicon.png" width="135" />

    <h1>{{$static.allPost.edges[0].node.title.rendered}}</h1>

    <div v-html=$static.allPost.edges[0].node.content.rendered>
    </div>

    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>

  </Layout>
</template>


<static-query>
  query {
    allPost {
      edges {
        node {
          id
          slug
          title {
            rendered
          }
          content {
            rendered
          }
        }
      }
    } 
  }
</static-query>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
