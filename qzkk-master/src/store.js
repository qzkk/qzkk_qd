import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        ACCOUNT_NAME: localStorage.getItem("account"),
        ACCOUNT_TYPE:  localStorage.getItem("type"),
        UID:  localStorage.getItem("uId"),
    },

    mutations: {
        setState(state, payload) {
            console.log("))))");
            console.log(payload);
            localStorage.setItem('account', payload.data.account);
            localStorage.setItem('type', payload.data.type);
            localStorage.setItem('uId', payload.data.uId);

            state.ACCOUNT_NAME = payload.data.account;
            state.ACCOUNT_TYPE = payload.data.type;
            state.UID = payload.data.uId;
        }
    },

    actions: {},

    getters: {
        // getName: (state) => {
        //     console.log("store.js");
        //     console.log(state);
        //     let accountname = state.ACCOUNT_NAME;
        //     return accountname;
        // },
        // getType: (state) => {
        //     return state.ACCOUNT_TYPE;
        // }
    }
})