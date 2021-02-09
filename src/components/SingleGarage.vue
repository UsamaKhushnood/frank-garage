<template>
  <div class="vGrid mt-4">
    <div
      class="gridItem border vehicle singleCar"
      v-for="(vehicle, vehicleIndex) in detail.cars.vehicles"
      :class="'griditem' + vehicleIndex"
      :key="vehicle._id"
    >
      <SingleCar
        :vehicle="vehicle"
        @click.native="testingTef(vehicleIndex)"
      ></SingleCar>
    </div>


  </div>
</template>
<script>
import SingleCar from "@/components/SingleCar";
export default {
  name: "SingleGarage",
  components: { SingleCar },
  props: ["detail"],
  data: () => ({
    dummyImg: require("@/assets/img/dummycar.png"),
    currentCar : 1
  }),
  methods: {
    testingTef(vehicleIndex) {
      this.$parent.$emit('emitData',this.detail.cars.vehicles[vehicleIndex].make)
      this.$root.$emit('bv::toggle::collapse', 'my-sidebar')
      console.log(this.detail.cars.vehicles[vehicleIndex].make)
      console.log(this.detail.cars.vehicles[vehicleIndex].date_added)
      this.currentCar = this.detail.cars.vehicles[vehicleIndex].make;
    },
  },
};
</script>

<style>
.vGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 12px;
  row-gap: 12px;
}

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
