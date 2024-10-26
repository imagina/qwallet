<template></template>
<script>
import { i18n } from '../../../plugins/utils';

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
        apiRoute: 'apiRoutes.qwallet.pockets',
        permission: 'iwallet.pockets',
        extraFormFields: 'Iwallet.crud-fields.pockets',
        create: {
          title: this.$tr('iwallet.cms.newPocket')
        },
        read: {
          showAs: 'grid',
          columns: [
            { name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px' },
            { name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth' },
            {
              name: 'type', label: this.$tr('isite.cms.form.type'), field: 'type',
              align: 'left', format: val => `<div style="color: ${val.color}">` +
                `<q-icon name="${val.icon}" />` + val.title + '</div>'
            },
            {
              name: 'total', label: 'Total', field: 'total',
              format: val => '$' + this.$trn(val), align: 'left'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' }
          ],
          requestParams: {
            order : {field : 'id', way : 'asc'}
          },
          grid : {
            component: () => import('modules/qwallet/_components/pocketCard')
          },
          filters: {
            transactionsDate: {
              type: 'dateRange',
              quickFilter: true,
              props: {
                label: i18n.tr('iwallet.cms.transactionsDate'),
                clearable: true,
                removeTime: true,
                autoClose: true,
                field: 'created_at'
              }
            }
          }
        },
        update: {
          title: this.$tr('iwallet.cms.updatePocket')
        },
        delete: true,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          title: {
            value: '',
            type: 'input',
            required: true,
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`
            }
          },
          typeId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: this.$tr('isite.cms.form.type') + '*'
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qwallet.types'
            }
          },
          color: {
            value: '#0b5f91',
            type: 'inputColor',
            isFakeField: true,
            props: {
              label: this.$tr('isite.cms.label.color')
            }
          },
          entityId: {
            value: '',
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.assignedTo')
            },
            loadOptions: {
              apiRoute: 'apiRoutes.quser.users',
              select: { label: 'fullName', id: 'id' },
              filterByQuery: true
            }
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: this.$tr('isite.cms.form.description'),
              type: 'textarea',
              rows: '3'
            }
          }
        },
        getDataForm: (data) => {
          return new Promise((resolve, reject) => {
            if (data.entityId) data.entityType = 'Modules\\User\\Entities\\Sentinel\\User';
            resolve(data);
          });
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
