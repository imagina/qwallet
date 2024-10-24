<template>
  <!--Dynamic List-->
  <dynamic-list :list-config="listConfig" @new="$refs.transactionCrud.create()"
                ref="transactionList" />
  <!-- Transacton CRUD -->
  <crud :crud-data="import('modules/qwallet/_crud/transactions')"
        type="onlyform" ref="transactionCrud"
        @created="$refs.transactionList.getData({page: 1})" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import controller from './controller';
//components
import dynamicList from 'modules/qsite/_components/master/dynamicList';

export default defineComponent({
  props: {},
  components: { dynamicList },
  setup (props, { emit })
  {
    return controller(props, emit);
  }
});
</script>
<style lang="scss">
#pocketPage {

}
</style>
