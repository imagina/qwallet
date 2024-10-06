<template>
  <div id="transactionsView">
    <div class="box">
      <!--Title-->
      <div class="text-blue-grey text-subtitle1 q-mb-md text-bold q-px-md">
        (pt) Transactions
      </div>
      <!--Table-->
      <dynamic-table :rows="mappedTransactions" :columns="columns" />
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue';
import dynamicTable from 'modules/qsite/_components/master/dynamicTable';

export default defineComponent({
  setup(props) {
    // Inject the controller from the parent
    return inject('controller');
  },
  components: { dynamicTable },
  data() {
    return {
      columns: [
        {
          name: 'value',
          label: 'Type',
          field: 'value',
          align: 'left',
          format: (val, row) => `<i class="${row.icon}" style="color: ${row.color}" />`
        },
        {
          name: 'value',
          label: 'Value',
          field: 'value',
          align: 'left',
          format: val => '$' + this.$trn(val)
        },
        {
          name: 'fromPocketName',
          label: this.types.negative.label,
          field: 'fromPocketName',
          align: 'left',
          format: val => val ?? '-'
        },
        {
          name: 'toPocketName',
          label: this.types.positive.label,
          field: 'toPocketName',
          align: 'left',
          format: val => val ?? '-'
        },
        {
          name: 'createdAt',
          label: 'createdAt',
          field: 'createdAt',
          align: 'left',
          format: val => this.$trd(val)
        },
        {
          name: 'comment',
          label: 'comment',
          field: 'comment',
          align: 'left',
          style: 'max-width : 250px',
          format: val => val ?? '-'
        }
      ]
    };
  },
  computed: {
    mappedTransactions() {
      return this.transactions.map(item => {
        let type = (item.fromPocketName && item.toPocketName) ? 'transaction' :
          (item.fromPocketName ? 'negative' : 'positive');
        return { ...item, ...this.types[type] };
      });
    }
  },
  methods: {}
});
</script>

<style lang="scss">
#transactionsView {
  .box {
    padding: 15px 0 !important;
  }

  thead {
    background-color: $blue-1;
  }

  .q-table__middle {
    box-shadow: none !important;
    border-radius: 0 !important;
  }
}
</style>
