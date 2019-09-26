<template>
  <div id="defect">
    <div>
      <b-nav>
        <b-nav-item>
          <img
            class="arrow"
            src="./../../img/rightt-arrow.png"
            width="50"
            height="50"
            @click="backpage()"
          />
        </b-nav-item>
        <b-nav-item>
          <h1>DEFECT</h1>
        </b-nav-item>
      </b-nav>
    </div>

    <b-container>
      <b-row>
        <h4>จำนวนของเสีย (Defect) :</h4>
        <button>
          <img src="./../../img/Minus.png" width="35" height="35" alt @click="minus()" />
        </button>
        <h4 class="counter">{{count}}</h4>
        <button>
          <img src="./../../img/Plus.png" width="35" height="35" alt @click="plus()" />
        </button>
      </b-row>
      <b-row>
        <h3>สาเหตุของเสีย (Defect Issue) :</h3>
      </b-row>
      <b-row>
        <b-input v-model="codedefect"></b-input>
      </b-row>

      <b-row>
        <b-col md="6">
          <img
            class="confirmdefect"
            @click="defectreason()"
            src="./../../img/ตกลง.png"
            width="220"
            height="60"
            alt
          />
        </b-col>
        <b-col md="6">
          <img
            class="cleardefect"
            @click="clearreason()"
            src="./../../img/ล้างข้อมูล.png"
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
import axios from "axios";

export default {
  data() {
    return {
      count: this.$store.state.numdefect,
      codedefect: "",
      machine_id: this.$store.state.machine_id
    };
  },
  methods: {
    backpage() {
      this.$router.push("/running");
    },
    plus() {
      this.count += 1;
    },
    minus() {
      this.count -= 1;
      if (this.count <= 1) {
        this.count = 1;
      }
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
    defectreason() {
      axios
        .post("http://206.189.36.97:3020/updateDefect", {
          machine_id: this.$store.state.machine_id,
          issue: this.codedefect,
          qty: this.count
        })
        .then(response => {
          console.log(response.data.message);
          if (response.data.success == "success") {
            console.log(response.data.message);
            this.codedefect = "";
            this.count = 1;
            this.$router.push("/running");
          } else {
            alert(response.data.message);
          }
        });
    },
    clearreason() {
      this.codedefect = "";
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