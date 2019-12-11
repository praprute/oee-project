<template>
  <div id="defect">
    <div>
      <b-nav>
        <b-nav-item>
          <h1>DEFECT</h1>
        </b-nav-item>
      </b-nav>
    </div>

    <b-container>
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
            <b-form-select v-model="selected" :options="wo" size="lg"></b-form-select>
            <!-- <b-col md="6" class="radioWoCol1" v-for="(item, index) in wo" :key="index">
              <b-form-radio
                
                v-model="selected"
                name="radio-options"
                value="wo[index]"
                size="lg"
              >
              {{wo[index]}}
              </b-form-radio>
              <br />
            </b-col>-->
          </b-row>
        </b-col>

        <b-col md="6">
          <h4>จำนวนของเสีย (Defect)</h4>
          <b-form-input type="text" v-model="input"></b-form-input>
          <div class="calculator">
            <div @click="append('9')" class="btn">9</div>
            <div @click="append('8')" class="btn">8</div>
            <div @click="append('7')" class="btn">7</div>
            <div @click="append('6')" class="btn">6</div>
            <div @click="append('5')" class="btn">5</div>
            <div @click="append('4')" class="btn">4</div>
            <div @click="append('3')" class="btn">3</div>
            <div @click="append('2')" class="btn">2</div>
            <div @click="append('1')" class="btn">1</div>
            <div @click="append('0')" class="btn">0</div>
            <div @click="dot" class="btn">.</div>
            <div @click="del" class="btn">DEL</div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
//import SimpleKeyboard from "./SimpleKeyboard";
import axios from "axios";

export default {
  components: {
    // SimpleKeyboard
  },
  data() {
    return {
      input: "",
      codedefect: "",
      machine_id: this.$store.state.machine_id,
      checked: false,
      wo: this.$store.state.wo,
      selected: ""
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
    // onChange(input) {
    //   this.input = input;
    // },
    // onKeyPress(button) {
    //   console.log("button", button);
    // },
    // onInputChange(input) {
    //   this.input = input.target.value;
    // },
    backpage() {
      this.$router.push("/running");
    },
    startdefect() {
      axios
        .post("http://167.172.66.170:3020/defect", {
          machine_id: this.$store.state.machine_id
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log("send defect");
            //this.wo = this.data.message.wo;
          } else {
            alert(response.data.message);
          }
        });
    },
    // check_type_number() {
    //   if (isNaN(this.input)) {
    //     alert("This not a number");
    //     this.input = "";
    //   } else {
    //     this.defectreason();
    //     this.input = "";
    //   }
    // },
    defectreason() {
      if (this.selected == "") {
        alert("กรุณาเลือก Work Order");
        return;
      }
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
            alert(response.data.message);
          }
        });
    },
    clearreason() {
      this.codedefect = "";
      this.input = "";
    }
  },
  beforeMount() {
    this.startdefect();
  }
};
</script>

<style lang="css">
.calculator {
  font-size: 35px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(50px, auto);
}

.btn {
  background-color: #013894;
  color: white;
  margin: 15px;
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
/* 
img.confirmdefect {
  margin-left: 200px;
} */
</style>