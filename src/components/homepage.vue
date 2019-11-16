<template>
  <div id="home">
    <div>
      <b-nav>
        <b-nav-item>
          <h1>HOME</h1>
        </b-nav-item>
      </b-nav>
    </div>
    <b-container fluid>
      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">เลขที่ใบสั่งผลิต (Work Order):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="wo"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartext1()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">ขั้นตอนการผลิต (Routing):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="rout"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartext2()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">รหัสพนักงาน (Operation Order):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="oid"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartext3()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>
    </b-container>

    <button class="button-confirm">
      <img src="./../img_new/confirm_login.png" width="250" height="80" @click="login()" />
    </button>
    <button class="button-downtimeHome"
     @click="stop_downtime()" >
      <span>Down Time</span>
      <br>
      <span>เครื่องหยุด</span>
      <!-- <img src="./../img_new/เครื่องหยุด.png" width="250" height="80" @click="defect()" />-->
    </button> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      wo: this.$store.state.wo,
      rout: this.$store.state.rout,
      oid: this.$store.state.oid,
      machine_id: this.$store.state.machine_id
    };
  },

  methods: {
    login() {
      axios
        .post("http://192.168.1.16:3020/login", {
          workorder: this.wo,
          routing: this.rout,
          operateId: this.oid,
          machine_id: this.machine_id
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            this.$store.state.wo = this.wo;
            this.$store.state.rout = this.rout;
            this.$store.state.oid = this.oid;
            this.$router.push("/ready");
          } else {
            alert(response.data.message_th);
          }
        });
    },
    cleartext1() {
      this.wo = "";
    },
    cleartext2() {
      this.rout = "";
    },
    cleartext3() {
      this.oid = "";
    },
    stop_downtime() {
      axios
        .post("http://192.168.1.16:3020/downtime2", {
          machine_id: this.$store.state.machine_id,
          // opn: this.$store.state.opn,
          // workorder: this.$store.state.wo,
          downtime_code: null,
          //employee_id: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log("Stop");
            this.$router.push("/Downtime2");
          } else {
            alert(response.data.message);
          }
        });
    }
  }
};
</script>

<style lang="css">

.button-downtimeHome{
  font-size: large;
  color: #f5f5f5;
  background-color: #013894;
  border: 1px solid;
  width: 250px;
  height: 80px;
  top: 20px;
  left: 300px;
  position: relative;

}

.row.my-1{
  padding-bottom: 20px;
}

button.btn.btn-light {
  border: 1px solid;
  margin-top: -2px
}

.form-control{
  margin-top: -3px;
  height: 53px;
  font-size: 2rem;
}

label.labelhome {
  font-size: 25px;
}
.col-md-2{
  padding-top: 2px;
}

.nav {
  background-color: #013894;
  padding: 5px;
}

a.nav-link {
  margin-top: 7px;
  margin-left: 20px;
  color: rgb(255, 255, 255);
}

body {
  background-color: #f5f5f5;
}

.container-fluid {
  margin-top: 50px;
}


button.button-confirm {
  top: 30px;
  left: 300px;
  position: relative;
}
</style>