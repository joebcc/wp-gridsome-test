<template>
  <Layout>

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/favicon.png" width="135" />

    <div v-for="post in $static.allPost.edges" :key="post.slug">
      <h1>{{post.node.title}}</h1>

      <div v-html=post.node.content />
    </div>
<!-- 
    <h1>{{$static.allPost.edges[0].node.title}}</h1>

    <div v-html=$static.allPost.edges[0].node.content>
    </div> -->

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
          title 
          content 
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
