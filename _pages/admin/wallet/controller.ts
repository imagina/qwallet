import { computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance } from 'vue';
import service from './services';
import store from './store';

export default function controller (props: any, emit: any)
{
  const proxy = getCurrentInstance()!.appContext.config.globalProperties;

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  };

  // States
  const state = reactive({
    pockets: [],
    loadingPockets: false
  });

  // Computed
  const computeds = {};

  // Methods
  const methods = {
    getPockets: () =>
    {
      state.loadingPockets = true;
      service.getPockets(true).then(response =>
      {
        state.pockets = response.data;
        state.loadingPockets = false;
      }).catch(error => state.loadingPockets = false);
    }
  };

  // Mounted
  onMounted(() =>
  {
    methods.getPockets();
  });

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return { ...refs, ...(toRefs(state)), ...computeds, ...methods, store };
}
