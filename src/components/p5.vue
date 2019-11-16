<template>
  <div id="downtime">
    <div>
      <b-nav>
        
        <b-nav-item>
          <h1>STOP / DOWN TIME</h1>
        </b-nav-item>
      </b-nav>
    </div>

    <b-container>
      <b-row>
        <h2>เหตุผล (Issue) :</h2>
      </b-row>
      <b-row>
        <b-input v-model="reason"></b-input>
      </b-row>
      <b-row>
        <b-col md="6">
          <img
            class="confirmdowntime"
            @click="downtimereason()"
            src="./../img_new/ตกลง.png"
            width="220"
            height="60"
            alt
          />
        </b-col>
        <b-col md="6">
          <img
            class="cleardefectdowntime"
            @click="clearreason()"
            src="./../img_new/ล้างข้อมูล.png"
            width="220"
            height="60"
            alt
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reason: "",
      machine_id: this.$store.state.machine_id
    };
  },
  methods: {
    back() {
      this.$router.push("/running");
    },
    // startdowntime() {
    //   axios
    //     .post("http://192.168.1.16:3020:3020:3020/downtime", {
    //       machine_id: this.$store.state.machine_id
    //     })
    //     .then(response => {
    //       console.log(response.data.message);
    //       if (response.data.success == "success") {
    //         console.log("send downtime");
    //       } else {
    //         alert(response.data.message);
    //       }
    //     });
    // },
    downtimereason() {
      console.log(this.$store.state.machine_id);
      axios
        .post("http://192.168.1.16:3020/updateDowntime", {
          machine_id: this.$store.state.machine_id,
          issue: this.reason,
          workorder: this.$store.state.wo,
          opn: this.$store.state.opn,
          employee_id: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log(response.data.message);
            this.reason = "";
            this.$router.go(-1)   //push("/running");
          } else {
            alert(response.data.message);
          }
        });
    },
    clearreason() {
      this.reason = "";
    }
  },
  beforeMount() {
    // this.startdowntime();
  }
};
</script>

<style lang="css">
body {
  background-color: #f5f5f5;
}

a.nav-link h1 {
  margin-top: 5px;
  margin-left: -20px;
  color: rgb(255, 255, 255);
}

a.nav-link img.logout2 {
  margin-left: 491px;
  margin-top: -7px;
}

img.arrow {
  transform: rotate(180deg);
}

img.confirmdowntime{
  position: relative;
  left: 200px;
}
</style>