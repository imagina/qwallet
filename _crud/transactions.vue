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
          title: this.$trp('iwallet.cms.transaction'),
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
              label: this.$tr('iwallet.cms.origin'),
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
              label: this.$tr('iwallet.cms.destination'),
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
              label: this.$tr('isite.cms.label.amount') + '*',
              type: 'number'
            }
          },
          comment: {
            value: null,
            type: 'input',
            props: {
              label: this.$tr('isite.cms.label.comment'),
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
