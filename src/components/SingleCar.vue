<template>
  <div class="singleCar">
    <!-- conditionally show image  -->
    <img
      class="carImg"
      :src="vehicle.img"
      v-if="vehicle.img"
      alt="No Preview"
    />
    <img class="carImg" :src="dummyImg" v-else alt="No Preview" />
    <div class="p-3">
      <h3 class="make">{{ vehicle.make }}</h3>
      <div class="modelDetails">
        <div class="model d-flex ">
          <p class="bold">Model:</p>
          <p class="price ml-auto ">{{ vehicle.model }}</p>
        </div>
        <div class="price d-flex ">
          <p class="bold">Price:</p>
          <p class="price ml-auto ">&euro;{{ vehicle.price }}</p>
        </div>
      </div>
      <p class="dateAdded ml-auto ">{{ vehicle.date_added }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "SingleCar",
  props: ["vehicle"],
  data: () => ({
    dummyImg: require("@/assets/img/dummycar.png"),
  }),
  methods:{
      working(){
          console.log('working');
          console.log(this.vehicle.make)
      }
  }
};
</script>
<style lang="css">
p.dateAdded.ml-auto {
  font-size: 10px;
  color: grey;
  text-align: right;
  margin-top: 15px;
}

.modelDetails {
  margin-top: 25px;
}

.singleCar {
  cursor: pointer;
  transition: all 0.3s;
}

.singleCar:hover {
  transform: scale(1.02);
}
</style>
