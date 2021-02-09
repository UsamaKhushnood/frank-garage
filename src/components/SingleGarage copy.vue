<template>
  <div class="vGrid mt-4">
    <div
      class="gridItem border vehicle "
      :class="'griditem' + vehicleIndex"
      v-for="(vehicle, vehicleIndex) in detail.cars.vehicles"
      :key="vehicle._id"
    >
      <SingleCar :vehicle="vehicle" @click.native="testingRef(vehicleIndex)" ref="singleCarRef"></SingleCar>
    </div>
  </div>
</template>
<script>
import SingleCar from "@/components/SingleCar";
export default {
  name: "SingleGarage",
  components: { SingleCar },
  props: ["detail"],
  data: () => ({}),
  method:{
    testingRef(index){
        this.$refs.singleCarRef[index].start()
    }
  }
};
</script>

<style>
.vGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 12px;
  row-gap: 12px;
}

</style>
