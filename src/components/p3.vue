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

        <b-nav-item left v-if="offAndon == 'Offline' ">
           <h2 class="status-off-on-p3" style="color: red;">{{offAndon}}</h2>
        </b-nav-item>
        <b-nav-item left v-else>
           <h2 class="status-off-on-p3" style="color: #3fd421;">{{offAndon}}</h2>
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
      <br/>

      <b-row class="rowp2" v-for="(item, index) in item_no" :key="index">
        <!-- {{item}} -->

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
import offline from 'v-offline';

export default {
  components:{
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
      rout_name: ["loading"], //this.$store.state.rout_name,
      product_order: ["loading"],
      receive_order: ["loading"],
      remaining_order: ["loading"],
      machine_id: this.$store.state.machine_id,
      remark: ["loading"],
      intv: null,
      offAndon:null
    };
  },
  methods: {
    update_sensor: function() {
      this.intv = setInterval(() => {
        axios
          .post("http://167.172.66.170:3020/checknet", {
          })
          .then(response => {
            if (response.data.success == "success"){
              this.offAndon = "Online"
              console.log("online");
          axios
            .post("http://167.172.66.170:3020/status", {
              machine_id: this.machine_id
            })
            .then(response => {
            if (response.data.success == "success") {
              this.work_order = [];
              this.item_no = [];
              this.item_name = [];
              this.rout_name = [];
              (this.product_order = []),
                (this.receive_order = []),
                (this.remaining_order = []),
                (this.remark = []);
              for (
                let index = 0;
                index < response.data.message.length;
                index++
              ) {
                this.work_order.push(response.data.message[index].wo);
                this.item_no.push(response.data.message[index].itemNo);
                this.item_name.push(response.data.message[index].itemName);
                this.product_order.push(
                  parseFloat(
                    Math.round(
                      response.data.message[index].productOrder * 100
                    ) / 100
                  ).toFixed(2)
                );
                this.receive_order.push(
                  parseFloat(
                    Math.round(
                      response.data.message[index].receiveOrder * 100
                    ) / 100
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
          }else{
              this.offAndon = "Offline"
              console.log("offline");
          }
          })
          .catch(error => {
          console.log(error);
          this.offAndon = "Offline"
          })
      }, 1000);
    },
    stop_downtime() {
      clearInterval(this.intv);
      axios
        .post("http://167.172.66.170:3020/downtime", {
          downtime_code: "",
          machine_id: this.$store.state.machine_id,
          employee_id: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log("Stop");
            this.$router.push("/downtime");
          } else {
           alert("กรอกข้อมูลไม่ถูกต้อง");
          }
        });
    },
    defect() {
      clearInterval(this.intv);
      this.$router.push("/defect");
    },
    back() {
      clearInterval(this.intv);
      //this.$router.go(-1);
      this.$router.push("/ready");
    },
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
            this.$store.state.rout_name = "";
            this.$store.state.oid = "";
            this.$router.push("/home");
          } else {
           alert("กรอกข้อมูลไม่ถูกต้อง");
          }
        });
    }
  },
  beforeMount() {
    this.update_sensor();
  },
  beforeDestroy(){
    clearInterval(this.intv)
  }
};
</script>

<style lang="css">
body {
  background-color: #f5f5f5;
}

.col-sm-8 {
  padding-bottom: 70px;
}

a.nav-link h1#hrunning {
  margin-top: 25px;
  margin-left: -20px;
  color: rgb(255, 255, 255);
}

a.nav-link img.logoutRight {
  margin-left: 163px;
  margin-top: -18px;
  padding-top: 20px;
}

.nav h2.status-off-on-p3{
  padding-left: 100px;
  padding-top: 25px;
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