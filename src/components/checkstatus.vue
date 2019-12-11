<template>
  <div>
    <h1>Check Status</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      workorder: this.$store.state.wo,
      routing: this.$store.state.rout,
      operateId: this.$store.state.oid
    };
  },
  methods: {
    checkstatus() {
      console.log("checkstatus");
      console.log(this.$store.state.machine_id);

      axios
        .post("http://localhost:3020/checkStatus", {
          machine_id: this.$store.state.machine_id
        })
        .then(response => {
          console.log(response);
          console.log(response.data);
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
            alert(response.data.message);
          }
        });
    }
  },
  beforeMount() {
    this.checkstatus();
  }
};
</script>