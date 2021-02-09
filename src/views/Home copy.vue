<template>
  <div class="home">
    <!-- warehouse details  -->
    <div v-for="(detail, index) in details" :key="index" class="container mt-5 mb-5">
      <h1>{{detail.name}} <span class="location">{{detail.cars.location}}</span></h1>     
      <!-- vehicle details   -->
        <div class="vGrid mt-4">
          <SingleCar :detail="detail"> </SingleCar>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import SingleCar from '../components/SingleCar.vue';
export default {
  components: { SingleCar },
  name: 'Home',
  data: ()  => ({
    details : String,    
  }),
  mounted () {
    axios
      .get('https://api.jsonbin.io/b/5ebe673947a2266b1478d892')
      .then(response => {
        var results;
        response.data.forEach(element => {
          element.cars.vehicles.sort((a,b) => {
            a = new Date(a.date_added); 
            b = new Date(b.date_added);
            results = a > b ? -1 : a < b ? 1 : 0;
            return results * -1
          })
        });
        this.details = response.data
      } )
  }
}
</script>
<style>
.carImg{
  width: 100%;
  height: auto;
}

.location{
  font-size: 15px;
}

.location:before{
  content: '( '
}

.location:after {
  content: ' )'
}

.vGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 12px;
    row-gap: 12px;
}

</style>