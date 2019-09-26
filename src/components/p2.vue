<template>
  <div id="ready">
    <div>
      <b-nav>
        <b-nav-item>
          <h1>READY</h1>
        </b-nav-item>

        <b-nav-item right>
          <img
            class="logout"
            src="./../../img/Logout.png"
            width="130"
            height="60"
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
              <td>{{rout}}</td>
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
          </table>
        </b-col>

        <b-col sm="3">
          <button>
            <img
              class="p2"
              src="./../../img/StartJob.png"
              width="250"
              height="250"
              alt
              @click="statrtjob()"
            />
          </button>

          <button>
            <img src="./../../img/EndJob.png" width="250" height="60" alt @click="endjob()" />
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

      work_order: this.$store.state.wo,
      item_no: "loading",
      item_name: "loading",
      rout: this.$store.state.rout,
      product_order: "loading",
      receive_order: "loading",
      remaining_order: "loading",
      machine_id: this.$store.state.machine_id
    };
  },
  methods: {
    logout() {
      axios
        .post("http://206.189.36.97:3020/logout", {
          machine_id: this.$store.state.machine_id,
          operateId: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            this.$store.state.oid = "";
            this.$router.push("/home");
          } else {
            alert(response.data.message);
          }
        });
    },
    statrtjob() {
      axios
        .post("http://206.189.36.97:3020/ready", {
          machine_id: this.$store.state.machine_id,
          workorder: this.$store.state.wo,
          routing: this.$store.state.rout
        })
        .then(response => {
          //console.log(response.data.message[0]);
          if (response.data.success == "success") {
            // this.item_no = response.data.itemNo;
            // this.item_name = response.data.itemName;
            // this.product_order = response.data.productOrder;
            // this.receive_order = response.data.receiveOrder;
            // this.remaining_order = response.data.remainingOrder;
            this.$router.push("/running");
          } else {
            alert(response.data.message);
          }
        });
    },
    status() {
      axios
        .post("http://206.189.36.97:3020/status", {
          workorder: this.$store.state.wo,
          routing: this.$store.state.rout
          //email: "brainwaveelectronic@gmail.com",
          //password: "password1"
        })
        .then(response => {
          //console.log(response.data.message[0]);
          if (response.data.success == "success") {
            // this.item_no = response.data.message[0].id_txt;
            // this.item_name = response.data.message[0].address;
            this.item_no = response.data.message[0].itemNo;
            this.item_name = response.data.message[0].itemName;
            this.product_order = response.data.message[0].productOrder;
            this.receive_order = response.data.message[0].receiveOrder;
            this.remaining_order = response.data.message[0].remainingOrder;
          } else {
            alert(response.data.message);
          }
        });
    },
    endjob() {
      axios
        .post("http://206.189.36.97:3020/stop", {
          workorder: this.$store.state.wo,
          machine_id: this.$store.state.machine_id,
          routing: this.$store.state.rout
          //   itemNo: this.item_no,
          //   itemName: this.item_name
          // //   po: this.product_order,
          // //   ro: this.receive_order,
          // //   re: this.remaining_order
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            this.$store.state.wo = null;
            this.$store.state.oid = null;
            this.$store.state.rout = null;

            this.$router.push("/home");
            console.log("success");
          } else {
            alert(response.data.message);
          }
        });
    }
  },
  beforeMount() {
    this.status();
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
table {
  margin-top: 10px;
  font-size: 22px;
}

td {
  padding-bottom: 10px;
  padding-top: 10px;
}

a.nav-link img.logout {
  margin-left: 652px;
  margin-top: -7px;
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