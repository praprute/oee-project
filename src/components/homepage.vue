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
          <label class="labelhome">เลขที่ใบสั่งผลิต (Work Order 1):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="wo"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextw0()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">ขั้นตอนการผลิต (Routing 1):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="rout0"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextr0()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">เลขที่ใบสั่งผลิต (Work Order 2):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="wo1"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextw1()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">ขั้นตอนการผลิต (Routing 2):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="rout1"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextr1()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">เลขที่ใบสั่งผลิต (Work Order 3):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="wo2"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextw2()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">ขั้นตอนการผลิต (Routing 3):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="rout2"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextr2()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">เลขที่ใบสั่งผลิต (Work Order 4):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="wo3"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextw3()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col md="5">
          <label class="labelhome">ขั้นตอนการผลิต (Routing 4):</label>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="rout3"></b-form-input>
        </b-col>
        <b-col md="2">
          <b-button class="clearhomeinput" variant="light" @click="cleartextr3()">ล้าง (Clear)</b-button>
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
          <b-button class="clearhomeinput" variant="light" @click="cleartextOID()">ล้าง (Clear)</b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-row class="my-bb">
      <button class="button-confirm">
        <img src="./../img_new/confirm_login.png" width="250" height="80" @click="login()" />
      </button>
      <button class="button-downtimeHome" @click="stop_downtime()">
        <span>Down Time</span>
        <span>เครื่องหยุด</span>
        <!-- <img src="./../img_new/เครื่องหยุด.png" width="250" height="80" @click="defect()" />-->
      </button>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      woo: this.$store.state.wo,
      roo: this.$store.state.rout,
      wo: this.$store.state.wo0,
      rout0: this.$store.state.ro0,
      wo1: this.$store.state.wo1,
      rout1: this.$store.state.ro1,
      wo2: this.$store.state.wo2,
      rout2: this.$store.state.ro2,
      wo3: this.$store.state.wo3,
      rout3: this.$store.state.ro3,
      oid: this.$store.state.oid,
      machine_id: this.$store.state.machine_id
    };
  },
  //http://167.172.66ee.170
  methods: {
    login() {
      var workorder = [];
      var routing = [];
      workorder.push(this.wo);
      workorder.push(this.wo1);
      workorder.push(this.wo2);
      workorder.push(this.wo3);

      routing.push(this.rout0);
      routing.push(this.rout1);
      routing.push(this.rout2);
      routing.push(this.rout3);

      console.log(workorder);
      console.log(routing);

      if(this.wo !== null){
        if(this.rout0 == null){
          alert("กรอกข้อมูลไม่ถูกต้อง")
        }
      }

      if(this.wo1 !== null){
        if(this.rout1 == null){
           alert("กรอกข้อมูลไม่ถูกต้อง")
        }
      }

      if(this.wo2 !== null){
        if(this.rout2 == null){
          alert("กรอกข้อมูลไม่ถูกต้อง")
        }
      }

      if(this.wo3 !== null){
        if(this.rout3 == null){
          alert("กรอกข้อมูลไม่ถูกต้อง")
        }
      }



      axios
        .post("http://167.172.66.170:3020/login", {
          machine_id: this.machine_id,
          workorder: workorder,
          routing: routing,
          operateId: this.oid
        })
        .then(response => {
          console.log(response);
          console.log(response.data.message);
          if (response.data.success == "success") {
            this.$store.state.oid = this.oid;
            console.log(this.wo);
            this.$router.push("/ready");
          } else {
            alert(response.data.message_th);
          }
        });
    },
    cleartextw0() {
      //this.woo.splice(0, 1, null);
      this.wo = null;
      this.$store.state.wo0 = null;
    },
    cleartextr0() {
      //this.rout.splice(0, 1, null);
      this.rout0 = null;
      this.$store.state.ro0 = null;
    },
    cleartextw1() {
      //this.wo.splice(1, 1, null);
      this.wo1 = null;
      this.$store.state.wo1 = null;
    },
    cleartextr1() {
      //this.rout.splice(1, 1, null);
      this.rout1 = null;
      this.$store.state.ro1 = null;
    },
    cleartextw2() {
      //this.wo.splice(2, 1, null);
      this.wo2 = null;
      this.$store.state.wo2 = null;
    },
    cleartextr2() {
      //this.rout.splice(2, 1, null);
      this.rout2 = null;
      this.$store.state.ro2 = null;
    },
    cleartextw3() {
      //this.wo.splice(3, 1, null);
      this.wo3 = null;
      this.$store.state.wo3 = null;
    },
    cleartextr3() {
      //this.rout.splice(3, 1, null);
      this.rout3 = null;
      this.$store.state.ro3 = null;
    },
    cleartextOID() {
      this.oid = "";
    },
    stop_downtime() {
      axios
        .post("http://167.172.66.170:3020/downtime2", {
          machine_id: this.$store.state.machine_id,
          // opn: this.$store.state.opn,
          // workorder: this.$store.state.wo,
          downtime_code: null
          //employee_id: this.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log("Stop");
            this.$store.state.oid = this.oid;
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
.button-downtimeHome {
  font-size: large;
  color: #f5f5f5;
  background-color: #013894;
  border: 1px solid;
  width: 250px;
  height: 80px;
  /* top: 20px; */
  left: 300px;
  position: relative;
}

.row.my-1 {
  padding-bottom: 20px;
}

button.btn.btn-light {
  border: 1px solid;
  margin-top: -2px;
}

.col-md-5 {
  margin-right: -35px;
}

.form-control {
  margin-top: -3px;
  height: 53px;
  font-size: 2rem;
}

label.labelhome {
  font-size: 25px;
}
.col-md-2 {
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

.row.my-bb {
  margin-bottom: 50px;
}
button.button-confirm {
  /* top: 30px; */
  left: 300px;
  position: relative;
}
</style>