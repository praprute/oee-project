import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        wo: [null,null,null,null],
        rout: [null,null,null,null],
        oid: "",
        machine_id: "sensor01_1",
        opn: [],
        rout_name: ""
    }
});


//sensor01_1