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
      <SingleGarage :detail="detail"> </SingleGarage>
    </div>
      <b-sidebar
      id="my-sidebar"
      title="Sidebar with backdrop"
      backdrop-variant="dark"
      ref="mySidebar"
      backdrop
      shadow
      @emit-data="testingEmit()"
    >
      <div class="px-3 py-2">
        <h1>{{currentCar}}</h1>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import SingleGarage from "../components/SingleGarage";
export default {
  components: { SingleGarage },
  name: "Home",
  data: () => ({
    details: String,
    currentCar: 'String',
  }),
  methods:{
    testingEmit(data){
      this.currentCar = data
      console.log('data from emit',data)
    }
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
<style>
.carImg {
  width: 100%;
  height: auto;
}

.location {
  font-size: 15px;
}

.location:before {
  content: "( ";
}

.location:after {
  content: " )";
}
</style>
