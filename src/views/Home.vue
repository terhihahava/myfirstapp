<template>

<div>

  <div class="test-image">
    <img src="https://farm8.staticflickr.com/7800/31846124037_fe9117c20f.jpg" />

  </div>
  <div>

    <h1 id="welcome-text">Welcome back!</h1>

    </div>

</div>
            
  
</template>

<script>

export default {
  name: 'home',
  
  data() {
    return {
      items: [
          {
            src: '~@/assets/img3.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ]
    }
  }
}

</script>

<style>

body {
  padding: 0px;
  background-color: #212121;
}

template {
  background-color: black;
  color: white
}

#landing-section{
  background-color:#212121;
  border: none;
}

h1 {
 color: white;

}

.card bg-dark text-white{
  background-color:#212121;}

#landing-section{
  background-image: url("https://farm8.staticflickr.com/7800/31846124037_fe9117c20f.jpg");
  /* background: url('~@/assets/imag333.JPG') !important; */
   box-shadow: 20px 20px 20px 0 #212121 inset;
   z-index: 100;
   width: 407px;
   height: 490px;
   padding: 10px;
    }

  img {
  /*  To contain the image to the confines of the div  */
  max-width: 100%;
}

.test-image {
  max-width: 100%; 
  width: 800px;
  margin: auto;
}

.test-image::after {
  display: block;
  position: relative;
  
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0,#212121 80%);
  margin-top: -100px;
  height: 100px;
  width: 100%;
  content: '';
}

#welcome-text{
  z-index:100;
  position: relative;
  bottom: 150px;
  left: 50px;
}

</style>


