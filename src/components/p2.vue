<template>
  <div id="ready">
    <div>
      <b-nav>
        <b-nav-item>
          <h1 class="h1p1">READY</h1>
        </b-nav-item>

        <b-nav-item left v-if="offAndon == 'Offline' ">
          <h2 class="status-off-on-p2" style="color: red;">{{offAndon}}</h2>
        </b-nav-item>
        <b-nav-item left v-else>
          <h2 class="status-off-on-p2" style="color: #3fd421;">{{offAndon}}</h2>
        </b-nav-item>

        <b-nav-item right>
          <img
            class="logout"
            src="./../img_new/Logout.png"
            width="170"
            height="100"
            @click="logout()"
          />
        </b-nav-item>
      </b-nav>
    </div>
    <b-container class="bv-example-row">
      <br />
      <b-row class="rowp2" v-for="(item, index) in item_no" :key="index">
        <b-col sm="8">
          <table>
            <tr class="trpage">
              <td width="60%">{{woI}}</td>
              <td>{{work_order[index]}}</td>
            </tr>
            <tr class="trpage">
              <td>{{ItemnoI}}</td>
              <td>{{item_no[index]}}</td>
            </tr>
            <tr class="trpage">
              <td>{{ItemnameI}}</td>
              <td>{{item_name[index]}}</td>
            </tr>
            <tr class="trpage">
              <td>{{RoutingI}}</td>
              <td>{{rout_name[index]}}</td>
            </tr>
            <tr class="trpage">
              <td>{{PoI}}</td>
              <td>{{product_order[index]}}</td>
            </tr>
            <tr class="trpage">
              <td>{{RoI}}</td>
              <td>{{receive_order[index]}}</td>
            </tr>
            <tr class="trpage">
              <td>{{ReOI}}</td>
              <td>{{remaining_order[index]}}</td>
            </tr>
            <tr class="trpage">
              <td>{{Remark_txt}}</td>
              <td>{{remark[index]}}</td>
            </tr>
          </table>
        </b-col>

        <b-col sm="3">
          <button>
            <img
              class="p2"
              src="./../img_new/StartJob.png"
              width="250"
              height="250"
              alt
              @click="statrtjob()"
            />
          </button>

          <button>
            <img src="./../img_new/EndJob.png" width="250" height="60" alt @click="endjob()" />
          </button>
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
      woI: "เลขที่ใบสั่งผลิต (Work Order): ",
      ItemnoI: "รหัสสินค้่า (Item No): ",
      ItemnameI: "ชื่อสินค้า (Item Name): ",
      RoutingI: "ชื่อขั้นตอนการผลิต (Routing): ",
      PoI: "จำนวนที่สั่งผลิต (Production Order): ",
      RoI: "จำนวนที่ผลิตเสร็จ (Received Order): ",
      ReOI: "จำนวนที่ค้างผลิต (Remaining Order): ",
      load: "Loading",
      Remark_txt: "Remarks :",

      work_order: ["loading"],
      item_no: ["loading"],
      item_name: ["loading"],
      rout_name: ["loading"],
      product_order: ["loading"],
      receive_order: ["loading"],
      remaining_order: ["loading"],
      machine_id: this.$store.state.machine_id,
      remark: ["loading"],
      wo: this.$store.state.wo0,
      rout0: this.$store.state.ro0,
      wo1: this.$store.state.wo1,
      rout1: this.$store.state.ro1,
      wo2: this.$store.state.wo2,
      rout2: this.$store.state.ro2,
      wo3: this.$store.state.wo3,
      rout3: this.$store.state.ro3,
      offAndon: null,
      intv: null
    };
  },
  methods: {
    logout() {
      clearInterval(this.intv);
      axios
        .post("http://167.172.66.170:3020/logout", {
          machine_id: this.$store.state.machine_id,
          employee_id: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            this.$store.state.oid = "";
            this.$store.state.rout_name = "";
            this.$router.push("/home");
            console.log([
              this.$store.state.wo0,
              this.$store.state.ro0,
              this.$store.state.wo1,
              this.$store.state.ro1,
              this.$store.state.wo2,
              this.$store.state.ro2,
              this.$store.state.wo3,
              this.$store.state.ro3
            ]);
          } else {
            alert("กรอกข้อมูลไม่ถูกต้อง");
          }
        });
    },
    statrtjob() {
      clearInterval(this.intv);
      axios
        .post("http://167.172.66.170:3020/ready", {
          machine_id: this.$store.state.machine_id,
          employee_id: this.$store.state.oid
        })
        .then(response => {
          //console.log(response.data.message[0]);
          if (response.data.success == "success") {
            this.$router.push("/running");
          } else {
            alert("กรอกข้อมูลไม่ถูกต้อง");
          }
        });
    },
    status() {
      console.log("status");
      console.log(this.$store.state.wo);
      axios
        .post("http://167.172.66.170:3020/status", {
          machine_id: this.$store.state.machine_id
        })
        .then(response => {
          console.log(response.data.message[0]);
          if (response.data.success == "success") {
            this.work_order = [];
            this.item_no = [];
            this.item_name = [];
            this.rout_name = [];
            (this.product_order = []),
              (this.receive_order = []),
              (this.remaining_order = []),
              (this.remark = []);
            for (let index = 0; index < response.data.message.length; index++) {
              this.work_order.push(response.data.message[index].wo);
              this.item_no.push(response.data.message[index].itemNo);
              this.item_name.push(response.data.message[index].itemName);
              this.product_order.push(
                parseFloat(
                  Math.round(response.data.message[index].productOrder * 100) /
                    100
                ).toFixed(2)
              );
              this.receive_order.push(
                parseFloat(
                  Math.round(response.data.message[index].receiveOrder * 100) /
                    100
                ).toFixed(2)
              );
              this.remaining_order.push(
                parseFloat(
                  Math.round(
                    response.data.message[index].remainingOrder * 100
                  ) / 100
                ).toFixed(2)
              );
              this.rout_name.push(response.data.message[index].routing);
              //this.$store.state.rout_name = response.data.message[0].routing
              this.remark.push(response.data.message[index].remark);
              this.$store.state.opn.push(response.data.message[index].opn);
            }
          } else {
            alert("กรอกข้อมูลไม่ถูกต้อง");
          }
        });
    },
    endjob() {
      clearInterval(this.intv);
      axios
        .post("http://167.172.66.170:3020/stop", {
          machine_id: this.$store.state.machine_id,
          employee_id: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            this.$store.state.oid = null;
            this.$store.state.wo = [];
            this.$store.state.rout_name = null;
            this.$store.state.wo0 = null;
            this.$store.state.ro0 = null;
            this.$store.state.wo1 = null;
            this.$store.state.ro1 = null;
            this.$store.state.wo2 = null;
            this.$store.state.ro2 = null;
            this.$store.state.wo3 = null;
            this.$store.state.ro3 = null;
            this.$router.push("/home");
            console.log("success");
          } else {
            alert("กรอกข้อมูลไม่ถูกต้อง");
          }
        });
    },
    net_val: function() {
      this.intv = setInterval(() => {
        axios
          .post("http://167.172.66.170:3020/checknet", {})
          .then(response => {
            console.log(response);
            if (response.data.success == "success") {
              this.offAndon = "Online";
              console.log("online");
              this.status();
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
    }
  },
  beforeMount() {
    this.net_val();
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

a.nav-link h1.h1p1 {
  margin-top: 27px;
  margin-left: -10px;
  color: rgb(255, 255, 255);
}
table {
  margin-top: 10px;
  font-size: 22px;
}

td {
  padding-bottom: 10px;
  padding-top: 10px;
}
.nav {
  padding-top: 20px;
  padding-bottom: 40px;
}

.nav h2.status-off-on-p2 {
  padding-left: 220px;
  padding-top: 25px;
}

.col-sm-3 {
  padding-top: 50px;
}

a.nav-link img.logout {
  margin-left: 190px;
  margin-top: -18px;
  padding-top: 20px;
}

img.arrow {
  transform: rotate(180deg);
}

.row.rowp2 {
  margin-top: 13px;
}

img.p2 {
  margin-bottom: 15px;
}
</style>