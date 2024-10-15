<template>
  <div id="transactionsView">
    <!--Dynamic List-->
    <dynamic-list :list-config="listConfig" @new="$refs.transactionCrud.create()"
                  ref="transactionList" @updatedRow="getPockets" />
    <!-- Transacton CRUD -->
    <crud :crud-data="import('modules/qwallet/_crud/transactions')"
          type="onlyform" ref="transactionCrud"
          @created="$refs.transactionList.getData({page: 1}), getPockets()" />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue';
import dynamicList from 'modules/qsite/_components/master/dynamicList';

export default defineComponent({
  components: { dynamicList },
  setup(props) {
    // Inject the controller from the parent
    return inject('controller');
  },
  computed: {},
  data() {
    return {
      listConfig: {
        apiRoute: 'apiRoutes.qwallet.transactions',
        permission: 'iwallet.transactions',
        pageActions: {
          extraActions: this.$hasAccess('iwallet.transactions.create') ? ['new'] : []
        },
        read: {
          title: this.$trp('iwallet.cms.transaction'),
          columns: [
            { name: 'id', field: 'id', label: 'ID' },
            {
              name: 'type',
              label: this.$tr('isite.cms.form.type'),
              field: 'type',
              align: 'left',
              format: val => `<i class="${val.icon}" style="color: ${val.color}" /> <span class="q-ml-sm">${val.title}</span>`
            },
            {
              name: 'amount',
              label: this.$tr('isite.cms.label.amount'),
              field: 'amount',
              align: 'left',
              format: val => '$' + this.$trn(val)
            },
            {
              name: 'origin',
              label: this.$tr('iwallet.cms.origin'),
              field: 'fromPocket',
              align: 'left',
              format: val => val?.title ?? '-'
            },
            {
              name: 'destination',
              label: this.$tr('iwallet.cms.destination'),
              field: 'toPocket',
              align: 'left',
              format: val => val?.title ?? '-'
            },
            {
              name: 'status',
              label: this.$tr('isite.cms.form.status'),
              field: 'status',
              align: 'left',
              isEditable: false,
              format: val => `<i class="${val.icon}" style="color: ${val.color}" /> <span>${val.title}</span>`,
              dynamicField: row => {
                if(!this.$hasAccess('iwallet.transactions.edit')) return null
                return {
                  name: 'statusId',
                  type: 'select',
                  props: {
                    label: this.$tr('isite.cms.form.status')
                  },
                  loadOptions: {
                    apiRoute: 'apiRoutes.qwallet.statuses'
                  }
                }
              }
            },
            {
              name: 'comment',
              label: this.$tr('isite.cms.label.comment'),
              field: 'comment',
              align: 'left',
              style: 'max-width : 250px',
              format: val => val ?? '...'
            },
            {
              name: 'createdAt',
              label: this.$tr('isite.cms.form.createdAt'),
              field: 'createdAt',
              align: 'left',
              format: val => this.$trd(val)
            }
          ],
          requestParams: { include: 'fromPocket,toPocket' },
          filters: {
            date: {
              value: null,
              type: 'dateRange',
              quickFilter: true,
              props: {
                label: this.$tr('isite.cms.label.date'),
                clearable: true
              }
            },
            fromPocketId: {
              value: null,
              type: 'select',
              quickFilter: true,
              props: {
                label: this.$tr('iwallet.cms.origin'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qwallet.pockets'
              }
            },
            toPocketId: {
              value: null,
              type: 'select',
              quickFilter: true,
              props: {
                label: this.$tr('iwallet.cms.destination'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qwallet.pockets'
              }
            }
          }
        }
      }
    };
  },
  methods: {}
});
</script>

<style lang="scss">
#transactionsView {

}
</style>
