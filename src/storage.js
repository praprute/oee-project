import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        numdefect: 1,
        wo: "",
        rout: "",
        oid: "",
        machine_id: "machineId01"
    }
});