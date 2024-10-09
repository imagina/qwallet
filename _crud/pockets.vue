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
        apiRoute: 'apiRoutes.qwallet.pockets',
        permission: 'iwallet.pockets',
        extraFormFields: 'Iwallet.crud-fields.pockets',
        create: {
          title: this.$tr('iwallet.cms.newPocket')
        },
        read: {},
        update: {
          title: this.$tr('iwallet.cms.updatePocket')
          //requestParams: {include: 'type'}
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
          assignedToId: {
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
