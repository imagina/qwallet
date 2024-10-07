<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qwallet.transactions',
        permission: 'iwallet.transactions',
        extraFormFields: 'Iwallet.crud-fields.transactions',
        create: {
          title: this.$tr('iwallet.cms.newTransaction')
        },
        read: {
          title: '(pt) Transactions',
          columns: [
            { name: 'id', field: 'id', label: 'ID' },
            {
              name: 'type',
              label: '(pt) Type',
              field: 'type',
              align: 'left',
              format: val => `<i class="${val.icon}" style="color: ${val.color}" /> <span>${val.label}</span>`
            },
            {
              name: 'amount',
              label: '(pt) amount',
              field: 'amount',
              align: 'left',
              format: val => '$' + this.$trn(val)
            },
            {
              name: 'fromPocket',
              label: '(pt) fromPocket',
              field: 'fromPocket',
              align: 'left',
              format: val => val?.title ?? '-'
            },
            {
              name: 'toPocket',
              label: '(pt) toPocket',
              field: 'toPocket',
              align: 'left',
              format: val => val?.title ?? '-'
            },
            {
              name: 'createdAt',
              label: '(pt) createdAt',
              field: 'createdAt',
              align: 'left',
              format: val => this.$trd(val)
            },
            {
              name: 'comment',
              label: '(pt) comment',
              field: 'comment',
              align: 'left',
              style: 'max-width : 250px',
              format: val => val ?? '...'
            }
          ],
          search: false,
          allowToggleView: false,
          excludeActions: ['sync', 'export', 'tour'],
          requestParams: { include: 'fromPocket,toPocket' },
          filters: {
            date: {
              value: null,
              type: 'dateRange',
              quickFilter: true,
              props: {
                label: `(pt) Date`,
                clearable: true
              }
            },
            fromPocketId: {
              value: null,
              type: 'select',
              quickFilter: true,
              props: {
                label: `(pt) From Pocket`,
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
                label: `(pt) To Pocket`,
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qwallet.pockets',
              }
            }
          }
        },
        update: {
          title: this.$tr('iwallet.cms.updateTransaction'),
          requestParams: { include: 'fromPocket,toPocket' }
        },
        delete: false,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          fromPocketId: {
            value: null,
            type: 'select',
            props: {
              label: `(pt) From Pocket`,
              clearable: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qwallet.pockets',
              select: { id: 'id', label: row => `${row.title} ($${this.$trn(row.total)})` }
            }
          },
          toPocketId: {
            value: null,
            type: 'select',
            props: {
              label: `(pt) To Pocket`,
              clearable: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qwallet.pockets',
              select: { id: 'id', label: row => `${row.title} ($${this.$trn(row.total)})` }
            }
          },
          amount: {
            value: null,
            type: 'input',
            required: true,
            props: {
              label: this.$tr('isite.cms.form.amount') + '*',
              type: 'number'
            }
          },
          comment: {
            value: null,
            type: 'input',
            props: {
              label: this.$tr('isite.cms.form.comment'),
              type: 'textarea',
              rows: '3'
            }
          }
        }
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    }
  }
};
</script>
