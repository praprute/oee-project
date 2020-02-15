<template>
  <div id="downtime">
    <div>
      <b-nav>
        <b-nav-item>
          <h1>STOP / DOWN TIME</h1>
        </b-nav-item>
        <b-nav-item left v-if="offAndon == 'Offline' ">
          <h2 class="status-off-on-p5" style="color: red;">{{offAndon}}</h2>
        </b-nav-item>
        <b-nav-item left v-else>
          <h2 class="status-off-on-p5" style="color: #3fd421;">{{offAndon}}</h2>
        </b-nav-item>
      </b-nav>
    </div>

    <b-container>
      <br />

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
import offline from "v-offline";

export default {
  components: {
    offline
  },
  data() {
    return {
      reason: "",
      machine_id: this.$store.state.machine_id,
      offAndon: null,
      intv: null,
      employee_id: this.$store.state.oid
    };
  },
  methods: {
    back() {
      clearInterval(this.intv);
      this.$router.push("/running");
    },
    downtimereason() {
      console.log(this.$store.state.machine_id);
      axios
        .post("http://localhost:3020/updateDowntime", {
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
            clearInterval(this.intv);
            this.$router.go(-1); //push("/running");
          } else {
            alert("กรอกข้อมูลไม่ถูกต้อง");
          }
        });
    },
    clearreason() {
      this.reason = "";
    },
    net_val: function() {
      this.intv = setInterval(() => {
        axios
          .post("http://localhost:3020/checknet", {})
          .then(response => {
            console.log(response);
            if (response.data.success == "success") {
              this.offAndon = "Online";
              console.log("online");
            } else {
              this.offAndon = "Offline";
              console.log("offline");
            }
          })
          .catch(error => {
            console.log(error);
            this.offAndon = "Offline";
          });
      }, 1000);
    },
    clearreason() {
      this.codedefect = "";
      this.input = "";
    }
  },
  beforeMount() {
    this.net_val();
    // this.startdowntime();
  },
  beforeDestroy() {
    clearInterval(this.intv);
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

.nav h2.status-off-on-p5 {
  padding-left: 70px;
  padding-top: 10px;
}

a.nav-link img.logout2 {
  margin-left: 491px;
  margin-top: -7px;
}

img.arrow {
  transform: rotate(180deg);
}

img.confirmdowntime {
  position: relative;
  left: 200px;
}
</style>