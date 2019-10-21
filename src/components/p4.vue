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
        <b-col md="4">
          <h4>จำนวนของเสีย (Defect) :</h4>
        </b-col>
        <b-col md="4">
          <b-form-input type="text" v-model="input" @input="onInputChange" @keypress="onlyNumber"></b-form-input>
        </b-col>
        <b-col md="4">
          <b-form-checkbox v-model="checked" name="check-button" switch size="lg">
            <b>(Keyboard: {{ checked }})</b>
          </b-form-checkbox>
        </b-col>
        <SimpleKeyboard
          v-show="checked"
          @onChange="onChange"
          @onKeyPress="onKeyPress"
          :input="input"
        />
        <!-- <button>
          <img
            src="http://206.189.36.97:3020/oee/img/Plus.png"
            width="35"
            height="35"
            alt
            @click="plus()"
          />
        </button>-->
      </b-row>

      <b-row v-show="!checked">
        <h3>สาเหตุของเสีย (Defect Issue) :</h3>
      </b-row>
      <b-row v-show="!checked">
        <b-input v-model="codedefect"></b-input>
      </b-row>

      <b-row v-show="!checked">
        <b-col md="6">
          <img
            class="confirmdefect"
            @click="check_type_number()()"
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
    </b-container>
  </div>
</template>

<script>
import SimpleKeyboard from "./SimpleKeyboard";
import axios from "axios";

export default {
  components: {
    SimpleKeyboard
  },
  data() {
    return {
      input: "",
      codedefect: "",
      machine_id: this.$store.state.machine_id,
      checked: false
    };
  },
  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    onChange(input) {
      this.input = input;
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      this.input = input.target.value;
    },
    backpage() {
      this.$router.push("/running");
    },
    startdefect() {
      axios
        .post("http://206.189.36.97:3020/defect", {
          machine_id: this.$store.state.machine_id
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log("send defect");
          } else {
            alert(response.data.message);
          }
        });
    },
    check_type_number() {
      if (isNaN(this.input)) {
        alert("This not a number");
        this.input = "";
      } else {
        this.defectreason();
        this.input = "";
      }
    },
    defectreason() {
      axios
        .post("http://206.189.36.97:3020/updateDefect", {
          machine_id: this.$store.state.machine_id,
          issue: this.codedefect,
          qty: this.input,
          opn: this.$store.state.opn,
          operateId: this.$store.state.oid
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log(response.data.message);
            this.codedefect = "";
            this.input = "";
            this.$router.push("/running");
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
body {
  background-color: #f5f5f5;
}

button.btn.button_plus1 {
  color: #f5f5f5;
  background-color: #013894;
  padding: 7px 20px 7px 20px;
  margin-right: 2px;
}
button.btn.button_plus2 {
  color: #f5f5f5;
  background-color: #013894;
  padding: 7px 15px 7px 15px;
  margin-right: 2px;
}
button.btn.button_plus3 {
  color: #f5f5f5;
  background-color: #013894;
  padding: 7px 10px 7px 10px;
  margin-right: 2px;
}
button.btn.button_plus4 {
  color: #f5f5f5;
  background-color: #013894;
  padding: 7px 20px 7px 20px;
  margin-right: 2px;
}
button.btn.button_plus5 {
  color: #f5f5f5;
  background-color: #013894;
  padding: 7px 20px 7px 20px;
  margin-right: 2px;
}
button.btn.button_plus6 {
  color: #f5f5f5;
  background-color: #013894;
  padding: 7px 17px 7px 17px;
  margin-right: 2px;
  margin-left: 15px;
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
img.confirmdefect {
  margin-left: 200px;
}
</style>