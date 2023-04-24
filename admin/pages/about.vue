<template>
  <div>
    <div >
      <h1></h1>
    </div>
  </div>
</template>

<script>



export default {
  //asyncData is fetching data before nuxt page app fisished loading on the broser.
  //it is good for SEO because the data will be loaded first
  async asyncData({$axios}) {
    try {
      console.log('oi');
      let response = await $axios.$get('http://localhost:3000/api/products')
      console.log('ola');
      return {
        products: response.products
      }
    } catch(err) {

    }
  }

};
</script>
