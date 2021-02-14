<template>
  <div class="home">
    <div class="text-right mt-4 container">
      <b-icon
        v-b-tooltip.left="'Checkout'"
        icon="cart3"
        font-scale="2"
        id="my-trigger-button-id"
      ></b-icon>
      <b-badge variant="dark count-badge"> {{ cart.length }} </b-badge>
    </div>
    <!-- warehouse cars  -->
    <div class="container mt-5 mb-5">
      <div class="d-flex flex-row-reverse">
        <select v-model="sortBy">
          <option disabled value="0">Sort By</option>
          <option value="-1">Acsending</option>
          <option value="1">Desending</option>
        </select>
      </div>
      <div class="vGrid mt-5">
        <div
          class="gridItem border p-2 singleCar"
          v-for="(car, index) in sorted"
          :key="index"
        >
          <img :src="car.img" v-if="car.img" />
          <img :src="dummyImg" v-else class="carImg" alt="car image" />
          <p class="licensed" v-if="car.Licensed"> Licensed </p>
          <p class="nolicensed" v-else> No License </p>
          <h5>{{ car.Name }}</h5>
          <p>{{ car.Date_added }}</p>
        </div>
      </div>
    </div>

    <!-- sidebar here-->
    <b-sidebar
      id="my-sidebar"
      title="Car cars"
      backdrop-variant="dark"
      ref="mySidebar"
      backdrop
      shadow
    >
    </b-sidebar>
  </div>
</template>

<script>
// @ is an alias to /src
import json from "../json/data.json";
export default {
  name: "Home",
  data: () => ({
    dummyImg: require("@/assets/img/dummycar.png"),
    cars: json,
    selectdGarage: [],
    carLocations: String,
    selectedCar: [],
    cart: [],
    sortBy: -1,
  }),
  methods: {
    OpenSidebar(garage, vehicle) {
      console.log(garage, vehicle);
      this.$root.$emit("bv::toggle::collapse", "my-sidebar");
    },
    addToCart(garage, vehicle) {
      this.cart.push(this.cars[garage].cars.vehicles[vehicle]);
      console.log(this.cars[garage].cars.vehicles[vehicle]);
      this.$root.$emit("bv::tooltip::show", "my-trigger-button-id");
    },
  },
  computed: {
    sorted() {
      return [...this.cars].sort((a, b) => {
        var results
        a = new Date(a.Date_added);
        b = new Date(b.Date_added);
        results = a > b ? -1 : a < b ? 1 : 0;
        return results * this.sortBy;
      });
    },
  },
  mounted() {
    console.log(this.cars[0]);
  },
};
</script>
