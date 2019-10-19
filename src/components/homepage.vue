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
          <b-button variant="light" @click="cleartext1()">ล้าง (Clear)</b-button>
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
          <b-button variant="light" @click="cleartext2()">ล้าง (Clear)</b-button>
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
          <b-button variant="light" @click="cleartext3()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>
    </b-container>

    <button class="button-confirm">
      <img src="./../img_new/confirm_login.png" width="250" height="80" @click="login()" />
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
        .post("http://206.189.36.97:3020/login", {
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
    }
  }
};
</script>

<style lang="css">
button.btn.btn-light {
  border: 1px solid;
}

label.labelhome {
  font-size: 28px;
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

.my-1 {
  padding: 10px;
}

button.button-confirm {
  top: 30px;
  left: 600px;
  position: relative;
}
</style>