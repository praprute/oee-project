<template>
  <div id="defect">
    <div>
      <b-nav class="navp4">
        <b-nav-item>
          <img
            class="arrowp4"
            src="./../img_new/rightt-arrow.png"
            width="50"
            height="50"
            @click="backpage()"
          />
        </b-nav-item>
        <b-nav-item>
          <h1 id="hdefect">DEFECT</h1>
        </b-nav-item>

        <b-nav-item left v-if="offAndon == 'Offline' ">
          <h2 class="status-off-on-p4" style="color: red;">{{offAndon}}</h2>
        </b-nav-item>
        <b-nav-item left v-else>
          <h2 class="status-off-on-p4" style="color: #3fd421;">{{offAndon}}</h2>
        </b-nav-item>
      </b-nav>
    </div>

    <b-container>
      <br />
      <b-row>
        <b-col md="6">
          <h4>สาเหตุของเสีย (Defect Issue)</h4>
          <b-input v-model="codedefect"></b-input>
          <b-row>
            <b-col md="6">
              <img
                class="confirmdefect"
                @click="defectreason()"
                src="./../img_new/ตกลง.png"
                width="220"
                height="60"
                alt
              />
            </b-col>

            <b-col md="6">
              <img
                class="cleardefect"
                @click="clearreason()"
                src="./../img_new/ล้างข้อมูล.png"
                width="220"
                height="60"
                alt
              />
            </b-col>
          </b-row>
          <b-row>
            <b-form-select v-model="selected" :options="woOptions" size="lg"></b-form-select>
          </b-row>
        </b-col>

        <b-col md="6">
          <h4>จำนวนของเสีย (Defect)</h4>
          <b-form-input type="text" v-model="input"></b-form-input>
          <div class="calculator">
            <div @click="append('9')" class="btnp4">9</div>
            <div @click="append('8')" class="btnp4">8</div>
            <div @click="append('7')" class="btnp4">7</div>
            <div @click="append('6')" class="btnp4">6</div>
            <div @click="append('5')" class="btnp4">5</div>
            <div @click="append('4')" class="btnp4">4</div>
            <div @click="append('3')" class="btnp4">3</div>
            <div @click="append('2')" class="btnp4">2</div>
            <div @click="append('1')" class="btnp4">1</div>
            <div @click="append('0')" class="btnp4">0</div>
            <div @click="dot" class="btnp4">.</div>
            <div @click="del" class="btnp4">DEL</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
//import SimpleKeyboard from "./SimpleKeyboard";
import axios from "axios";
import offline from "v-offline";

export default {
  components: {
    offline
  },
  data() {
    return {
      input: "",
      codedefect: "",
      machine_id: this.$store.state.machine_id,

      woOptions: [],

      wo0: this.$store.state.wo0,
      wo1: this.$store.state.wo1,
      wo2: this.$store.state.wo2,
      wo3: this.$store.state.wo3,
      offAndon: null,
      selected: "",
      intv: null
    };
  },
  methods: {
    append(number) {
      this.input = `${this.input}${number}`;
    },
    dot() {
      if (this.input.indexOf(".") === -1) {
        this.append(".");
      }
    },
    del() {
      this.input = this.input.slice(0, -1);
    },
    backpage() {
      clearInterval(this.intv);
      this.$router.push("/running");
    },
    checkWo() {
      axios
        .post("http://167.172.66.170:3020/wo", {
          machine_id: this.$store.state.machine_id
        })
        .then(response => {
          console.log("resWo");
          console.log(response.data);
          console.log("remes");
          if (response.data.success == "success") {
            if (response.data.message[0].wo1 != null) {
              if (
                this.woOptions.includes(response.data.message[0].wo1) == false
              ) {
                this.woOptions.push(response.data.message[0].wo1);
              }
            }
            if (response.data.message[0].wo2 != null) {
              if (
                this.woOptions.includes(response.data.message[0].wo2) == false
              ) {
                this.woOptions.push(response.data.message[0].wo2);
              }
            }
            if (response.data.message[0].wo3 != null) {
              if (
                this.woOptions.includes(response.data.message[0].wo3) == false
              ) {
                this.woOptions.push(response.data.message[0].wo3);
              }
            }
            if (response.data.message[0].wo4 != null) {
              if (
                this.woOptions.includes(response.data.message[0].wo4) == false
              ) {
                this.woOptions.push(response.data.message[0].wo4);
              }
            }
          }
        });
    },
    defectreason() {
      if (this.selected == "") {
        alert("กรุณาเลือก Work Order");
        return;
      }
      clearInterval(this.intv);
      axios
        .post("http://167.172.66.170:3020/updateDefect", {
          machine_id: this.$store.state.machine_id,
          issue: this.codedefect,
          qty: this.input,
          wo: this.selected,
          operateId: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log(response.data.message);
            this.codedefect = "";
            this.input = "";
            this.$router.push("/running"); //go(-1)
          } else {
            //alert(response.data.message);
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
    this.checkWo();
    this.net_val();
  },
  beforeDestroy() {
    clearInterval(this.intv);
  }

  //15
};
</script>

<style lang="css">
.calculator {
  font-size: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.nav h2.status-off-on-p4 {
  padding-left: 130px;
  padding-top: 10px;
}

.btnp4 {
  background-color: #013894;
  color: white;
  margin: 10px;
  padding: 10%;
  font-size: 20px;
  text-align: center;
}

body {
  background-color: #f5f5f5;
}

.custom-checkbox.b-custom-control-lg {
  margin-bottom: 35px;
  margin-left: 45px;
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

button {
  margin-top: -5px;
  margin-left: 20px;
}

h4.counter {
  margin-left: 20px;
}

img.add-defect {
  margin-top: -10px;
  margin-left: 20px;
}

img.arrowp4 {
  transform: rotate(180deg);
  margin-top: 10px;
}

a.nav-link h1#hdefect {
  margin-top: 10px;
  margin-left: -20px;
  color: rgb(255, 255, 255);
}

ul.nav.navp4 {
  padding: 10px;
}

/* 
img.confirmdefect {
  margin-left: 200px;
} */
</style>