<template>
  <div id="pocketPage">
    <div class="row q-col-gutter-md">
      <!-- Pockets -->
      <div class="col-4">
        <pockets />
      </div>
      <div class="col-8">
        <crud :crud-data="import('modules/qwallet/_crud/transactions.vue')"
              @created="getPockets" @updated="getPockets" @deleted="getPockets" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from 'vue';
import controller from './controller';
//Components
import pockets from './views/pockets.vue';

export default defineComponent({
  props: {},
  components: { pockets },
  setup (props, { emit })
  {
    // Initialize the controller instance
    const controllerInstance = controller(props, emit);
    // Provide the controller for child components
    provide('controller', controllerInstance);
    // Return the controller instance to make it available to the template
    return controllerInstance;
  }
});
</script>
<style lang="scss">
#pocketPage {

}
</style>
