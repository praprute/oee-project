<template>
  <div id="running">
    <div>
      <b-nav>
        <b-nav-item>
          <img
            class="arrowp3"
            src="./../img_new/rightt-arrow.png"
            width="50"
            height="50"
            @click="back()"
          />
        </b-nav-item>
        <b-nav-item>
          <h1 id="hrunning">RUNNING</h1>
        </b-nav-item>

        <b-nav-item right>
          <img
            class="logoutRight"
            src="./../img_new/Logout.png"
            width="170"
            height="100"
            @click="logout()"
          />
        </b-nav-item>
      </b-nav>
    </div>
    <b-container class="bv-example-row">
      <b-row class="rowp2">
        <b-col sm="8">
          <table>
            <tr class="trpage">
              <td width="60%">{{woI}}</td>
              <td>{{work_order}}</td>
            </tr>
            <tr class="trpage">
              <td>{{ItemnoI}}</td>
              <td>{{item_no}}</td>
            </tr>
            <tr class="trpage">
              <td>{{ItemnameI}}</td>
              <td>{{item_name}}</td>
            </tr>
            <tr class="trpage">
              <td>{{RoutingI}}</td>
              <td>{{rout_name}}</td>
            </tr>
            <tr class="trpage">
              <td>{{PoI}}</td>
              <td>{{product_order}}</td>
            </tr>
            <tr class="trpage">
              <td>{{RoI}}</td>
              <td>{{receive_order}}</td>
            </tr>
            <tr class="trpage">
              <td>{{ReOI}}</td>
              <td>{{remaining_order}}</td>
            </tr>
            <tr class="trpage">
              <td>{{Remark_txt}}</td>
              <td>{{remark}}</td>
            </tr>
          </table>
        </b-col>

        <b-col sm="3">
          <button>
            <img
              class="p3"
              src="./../img_new/เครื่องหยุด.png"
              width="250"
              height="250"
              alt
              @click="stop_downtime()"
            />
          </button>
          <button>
            <img src="./../img_new/Defect.png" width="250" height="60" alt @click="defect()" />
          </button>
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
      woI: "เลขที่ใบสั่งผลิต (Work Order): ",
      ItemnoI: "รหัสสินค้่า (Item No): ",
      ItemnameI: "ชื่อสินค้า (Item Name): ",
      RoutingI: "ชื่อขั้นตอนการผลิต (Routing): ",
      PoI: "จำนวนที่สั่งผลิต (Production Order): ",
      RoI: "จำนวนที่ผลิตเสร็จ (Received Order): ",
      ReOI: "จำนวนที่ค้างผลิต (Remaining Order): ",
      load: "Loading",
      Remark_txt: "Remarks :",

      work_order: this.$store.state.wo,
      item_no: "loading",
      item_name: "loading",
      rout_name: "loading", //this.$store.state.rout_name,
      product_order: "loading",
      receive_order: "loading",
      remaining_order: "loading",
      machine_id: this.$store.state.machine_id,
      remark: "loading",

      intv: null
    };
  },
  methods: {
    update_sensor: function() {
      this.intv = setInterval(() => {
        axios
          .post("http://167.172.66.170:3020/status", {
            workorder: this.$store.state.wo
          })
          .then(response => {
            //console.log(response.data.message);
            if (response.data.success == "success") {
              this.item_no = response.data.message[0].itemNo;
              this.item_name = response.data.message[0].itemName;
              this.product_order = parseFloat(
                Math.round(response.data.message[0].productOrder * 100) / 100
              ).toFixed(2);
              this.receive_order = parseFloat(
                Math.round(response.data.message[0].receiveOrder * 100) / 100
              ).toFixed(2);
              this.remaining_order = parseFloat(
                Math.round(response.data.message[0].remainingOrder * 100) / 100
              ).toFixed(2);
              this.rout_name = response.data.message[0].routing;
              //this.$store.state.rout_name = response.data.message[0].routing
              this.remark = response.data.message[0].remark;
              this.$store.state.opn = response.data.message[0].opn;
            } else {
              alert(response.data.message);
            }
          });
      }, 1000);
    },
    stop_downtime() {
      clearInterval(this.intv);
      axios
        .post("http://167.172.66.170:3020/downtime", {
          machine_id: this.$store.state.machine_id,
          opn: this.$store.state.opn,
          workorder: this.$store.state.wo,
          downtime_code: null,
          employee_id: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log("Stop");
            this.$router.push("/downtime");
          } else {
            alert(response.data.message);
          }
        });
    },
    defect() {
      clearInterval(this.intv);
      this.$router.push("/defect");
    },
    back() {
      clearInterval(this.intv);
      this.$router.push("/ready");
    },
    logout() {
      clearInterval(this.intv);
      axios
        .post("http://167.172.66.170:3020/logout", {
          machine_id: this.$store.state.machine_id,
          employee_id: this.$store.state.oid,
          workorder: this.$store.state.wo,
          opn: this.$store.state.opn
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            this.$store.state.rout_name = "";
            this.$store.state.oid = "";
            this.$router.push("/home");
          } else {
            alert(response.data.message);
          }
        });
    }
  },
  beforeMount() {
    this.update_sensor();
  }
};
</script>

<style lang="css">
body {
  background-color: #f5f5f5;
}

a.nav-link h1#hrunning {
  margin-top: 25px;
  margin-left: -20px;
  color: rgb(255, 255, 255);
}

a.nav-link img.logoutRight {
  margin-left: 399px;
  margin-top: -18px;
  padding-top: 20px;
}

img.arrowp3 {
  transform: rotate(180deg);
  margin-top: 25px;
}

.row {
  margin-top: 50px;
}
img.p3 {
  margin-bottom: 15px;
}
</style>