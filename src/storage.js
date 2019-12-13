import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        wo: [],
        wo0:"",
        wo1:"",
        wo2:"",
        wo3:"",
        rout: [],
        ro0:"",
        ro1:"",
        ro2:"",
        ro3:"",
        oid: "",
        machine_id: "sensor01_1",
        opn: [],
        rout_name: ""
    }
});


//sensor01_1