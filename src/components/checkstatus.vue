<template>
  <div>
    <h2>{{offAndon}}</h2>
    <h1>Check Status</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // workorder: this.$store.state.wo,
      // routing: this.$store.state.rout,
      operateId: this.$store.state.oid,
      wo0: "",
      wo1: "",
      wo2: "",
      wo3: "",
      ro0: "",
      ro1: "",
      ro2: "",
      ro3: "",
      intv: null,
      offAndon: null
    };
  },
  methods: {
    // checkstatus() {
    //   console.log("checkstatus");
    //   console.log(this.$store.state.machine_id);

    //   axios
    //     .post("http://167.172.66.170:3020/checkStatus", {
    //       machine_id: this.$store.state.machine_id
    //     })
    //     .then(response => {
    //       console.log(response);
    //       console.log(response.data);
    //       this.$store.state.wo0 = response.data.wo1;
    //       this.$store.state.ro0 = response.data.routing1;
    //       this.$store.state.wo1 = response.data.wo2;
    //       this.$store.state.ro1 = response.data.routing2;
    //       this.$store.state.wo2 = response.data.wo3;
    //       this.$store.state.ro2 = response.data.routing3;
    //       this.$store.state.wo3 = response.data.wo4;
    //       this.$store.state.ro3 = response.data.routing4;

    //       console.log(this.$store.state.wo0);
    //       console.log(this.$store.state.wo1);
    //       console.log(this.$store.state.wo2);
    //       console.log(this.$store.state.wo3);
    //       console.log(this.$store.state.ro0);
    //       console.log(this.$store.state.ro1);
    //       console.log(this.$store.state.ro2);
    //       console.log(this.$store.state.ro3);
    //       if (response.data.status == "working") {
    //         this.$store.state.wo = response.data.workorder;
    //         this.$store.state.rout = response.data.routing;
    //         this.$store.state.oid = response.data.empId;
    //         this.$router.push("/ready");
    //       } else if (response.data.status == "running") {
    //         this.$store.state.wo = response.data.workorder;
    //         this.$store.state.rout = response.data.routing;
    //         this.$store.state.oid = response.data.empId;
    //         this.$router.push("/running");
    //       } else if (response.data.status == "defect") {
    //         this.$store.state.wo = response.data.workorder;
    //         this.$store.state.rout = response.data.routing;
    //         this.$store.state.oid = response.data.empId;
    //         this.$router.push("/defect");
    //       } else if (response.data.status == "downtime") {
    //         this.$store.state.wo = response.data.workorder;
    //         this.$store.state.rout = response.data.routing;
    //         this.$store.state.oid = response.data.empId;
    //         this.$router.push("/downtime");
    //       } else if (response.data.status == "Idle") {
    //         this.$router.push("/home");
    //       } else if (response.data.status == "logout") {
    //         this.$store.state.wo = response.data.workorder;
    //         this.$store.state.rout = response.data.routing;
    //         this.$router.push("/home");
    //       } else {
    //        alert("กรอกข้อมูลไม่ถูกต้อง");
    //       }
    //     });
    // },

    //http://167.17AAAAAA2.66.170:3020
    net_val: function() {
      this.intv = setInterval(() => {
        axios
          .post("http://167.172.66.170:3020/checknet", {})
          .then(response => {
            console.log(response);
            if (response.data.success == "success") {
              this.offAndon = "Online";
              console.log("online");
              axios
                .post("http://167.172.66.170:3020/checkStatus", {
                  machine_id: this.$store.state.machine_id
                })
                .then(response => {
                  console.log(response);
                  console.log(response.data);
                  this.$store.state.wo0 = response.data.wo1;
                  this.$store.state.ro0 = response.data.routing1;
                  this.$store.state.wo1 = response.data.wo2;
                  this.$store.state.ro1 = response.data.routing2;
                  this.$store.state.wo2 = response.data.wo3;
                  this.$store.state.ro2 = response.data.routing3;
                  this.$store.state.wo3 = response.data.wo4;
                  this.$store.state.ro3 = response.data.routing4;
                  this.$store.state.oid = response.data.empId;
                  console.log(this.$store.state.wo0);
                  console.log(this.$store.state.wo1);
                  console.log(this.$store.state.wo2);
                  console.log(this.$store.state.wo3);
                  console.log(this.$store.state.ro0);
                  console.log(this.$store.state.ro1);
                  console.log(this.$store.state.ro2);
                  console.log(this.$store.state.ro3);
                  if (response.data.status == "working") {
                    this.$store.state.wo = response.data.workorder;
                    this.$store.state.rout = response.data.routing;
                    this.$store.state.oid = response.data.empId;
                    this.$router.push("/ready");
                  } else if (response.data.status == "running") {
                    this.$store.state.wo = response.data.workorder;
                    this.$store.state.rout = response.data.routing;
                    this.$store.state.oid = response.data.empId;
                    this.$router.push("/running");
                  } else if (response.data.status == "defect") {
                    this.$store.state.wo = response.data.workorder;
                    this.$store.state.rout = response.data.routing;
                    this.$store.state.oid = response.data.empId;
                    this.$router.push("/defect");
                  } else if (response.data.status == "downtime") {
                    this.$store.state.wo = response.data.workorder;
                    this.$store.state.rout = response.data.routing;
                    this.$store.state.oid = response.data.empId;
                    this.$router.push("/downtime");
                  } else if (response.data.status == "Idle") {
                    this.$router.push("/home");
                  } else if (response.data.status == "logout") {
                    this.$store.state.wo = response.data.workorder;
                    this.$store.state.rout = response.data.routing;
                    this.$router.push("/home");
                  } else {
                    alert("กรอกข้อมูลไม่ถูกต้อง");
                  }
                });
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
    // this.checkstatus();
    this.net_val();
  },
  beforeDestroy() {
    clearInterval(this.intv);
  }
};
</script>