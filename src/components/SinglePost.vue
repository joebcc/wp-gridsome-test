<template>
  <Layout>

    <!-- <div v-for="post in $static.allPost.edges" :key="post.slug"> -->
      <h1>{{$context.title}}</h1>

      <div v-html=$context.content />
    <!-- </div> -->
<!-- 
    <h1>{{$static.allPost.edges[0].node.title}}</h1>

    <div v-html=$static.allPost.edges[0].node.content>
    </div> -->

  </Layout>
</template>




<script>
export default {
  
}
</script>

<style> 
</style>
