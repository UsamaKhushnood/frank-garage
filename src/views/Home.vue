<template>
  <div class="home">
    <!-- warehouse details  -->
    <div
      v-for="(detail, detailindex) in details"
      :key="detailindex"
      class="container mt-5 mb-5"
    >
      <h1>
        {{ detail.name }}
        <span class="location">{{ detail.cars.location }}</span>
      </h1>
      <!-- vehicle details   -->
      <div class="vGrid mt-4">
        <div
          class="gridItem border vehicle singleCar"
          v-for="(vehicle, vehicleIndex) in detail.cars.vehicles"
          :class="'griditem' + vehicleIndex"
          :key="vehicle._id"
        >
          <div class="singleCar" @click="OpenSidebar(detailindex, vehicleIndex)">
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
        </div>
      </div>
    </div>
    <b-sidebar
      id="my-sidebar"
      title="Car Details"
      backdrop-variant="dark"
      ref="mySidebar"
      backdrop
      shadow
    >
      <div class="px-3 py-2">
        <div class="carImage">
            <img
              class="carImg"
              :src="selectedCar.img"
              v-if="selectedCar.img"
              alt="No Preview"
            />
            <img class="carImg" :src="dummyImg" v-else alt="No Preview" />          
        </div>
        <div class="car-details">
          <div class="d-flex align-items-sm-baseline justify-content-between">
            <div class="d-flex align-items-sm-baseline">
              <h1>{{ selectedCar.make }}</h1>   
              <h1 class="selectedCar-model"> {{selectedCar.model}} </h1>      
              <p class="selectedCar-year"> {{selectedCar.year_model}} </p>       
            </div>
            <h3 class="selectedCar-price"> &euro; {{selectedCar.price}} </h3>                   
          </div>
          <p class="selectedCar-licensed text-success" v-if="selectedCar.licensed"> Licensed </p>       
          <p class="selectedCar-licensed text-danger" v-else> License is not available </p>       
        </div>
        <div class="garage-detials border-top">
          <h1 class="location-details ">Location</h1>
          <div class="location-details d-flex align-items-sm-baseline">
            <h3 class="selectedGarage-name"> {{selectdGarage.name}} </h3>
            <p class="selectedGarage-location" > {{carLocations}} </p>
          </div>
          <gmap-map
            :center="center"
            :zoom="12"
            style="width:100%;  height: 400px;"
          >
          </gmap-map>

        </div>
      </div>
    </b-sidebar>

  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Home",
  data: () => ({
    dummyImg: require("@/assets/img/dummycar.png"),
    details: String,
    center: { lat: 47.13111, lng: -61.54801 },
    selectdGarage: [],
    carLocations: String,
    selectedCar: []
  }),
  methods: {
    OpenSidebar(garage, vehicle) {  
      let path = this.details[garage]
      this.selectdGarage = path
      this.center.lat = parseInt(this.selectdGarage.location.lat)
      this.center.lng = parseInt(this.selectdGarage.location.long)
      this.carLocations = this.selectdGarage.cars.location
      this.selectedCar = path.cars.vehicles[vehicle]
      this.$root.$emit("bv::toggle::collapse", "my-sidebar");
    },
  },
  mounted() {
    axios
      .get("https://api.jsonbin.io/b/5ebe673947a2266b1478d892")
      .then((response) => {
        var results;
        response.data.forEach((element) => {
          element.cars.vehicles.sort((a, b) => {
            a = new Date(a.date_added);
            b = new Date(b.date_added);
            results = a > b ? -1 : a < b ? 1 : 0;
            return results * -1;
          });
        });
        this.details = response.data;
      });
  },
};
</script>
