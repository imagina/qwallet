import {computed, reactive} from "vue";
//import {StateKeyInterface} from 'modules/qwallet/_pages/admin/wallet/interface'

interface StateInterface {
  //stateKey: StateKeyInterface[]
}

const state = reactive<StateInterface>({
  // key: Default value
})

export default computed(() => ({
  // set key(val) {
  //   state.key = val
  // },
  // get key() {
  //   return state.key
  // }
})).value
