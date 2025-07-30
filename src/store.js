import Vue from 'vue';

const state = Vue.observable({
    textInput: '',
    loading: true,

    setInput(val){
        this.textInput = val;
    },
    getInput(){
        return this.textInput;
    }
})

export default state;