import { computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance } from 'vue';
import service from './services';
import store from './store';
import {i18n} from 'src/plugins/utils';

export default function controller (props: any, emit: any)
{
  const proxy = getCurrentInstance()!.appContext.config.globalProperties;

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  };

  // States
  const state = reactive({
    listConfig: {
      apiRoute: 'apiRoutes.qwallet.transactions',
      permission: 'iwallet.transactions',
      pageActions: {
        extraActions: proxy.$hasAccess('iwallet.transactions.create') ? ['new'] : []
      },
      read: {
        title: i18n.trp('iwallet.cms.transaction'),
        columns: [
          { name: 'id', field: 'id', label: 'ID' },
          {
            name: 'type',
            label: i18n.tr('isite.cms.form.type'),
            field: 'type',
            align: 'left',
            format: val => `<i class="${val.icon}" style="color: ${val.color}" /> <span class="q-ml-sm">${val.title}</span>`
          },
          {
            name: 'amount',
            label: i18n.tr('isite.cms.label.amount'),
            field: 'amount',
            align: 'left',
            format: val => '$' + i18n.trn(val)
          },
          {
            name: 'origin',
            label: i18n.tr('iwallet.cms.origin'),
            field: 'fromPocket',
            align: 'left',
            format: val => val?.title ?? '-'
          },
          {
            name: 'destination',
            label: i18n.tr('iwallet.cms.destination'),
            field: 'toPocket',
            align: 'left',
            format: val => val?.title ?? '-'
          },
          {
            name: 'status',
            label: i18n.tr('isite.cms.form.status'),
            field: 'status',
            align: 'left',
            isEditable: false,
            format: val => `<i class="${val.icon}" style="color: ${val.color}" /> <span>${val.title}</span>`,
            dynamicField: row => {
              if(!proxy.$hasAccess('iwallet.transactions.edit')) return null
              return {
                name: 'statusId',
                type: 'select',
                props: {
                  label: i18n.tr('isite.cms.form.status')
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qwallet.statuses'
                }
              }
            }
          },
          {
            name: 'comment',
            label: i18n.tr('isite.cms.label.comment'),
            field: 'comment',
            align: 'left',
            style: 'max-width : 250px',
            format: val => val ?? '...'
          },
          {
            name: 'createdAt',
            label: i18n.tr('isite.cms.form.createdAt'),
            field: 'createdAt',
            align: 'left',
            format: val => i18n.trd(val)
          }
        ],
        requestParams: { include: 'fromPocket,toPocket' },
        filters: {
          date: {
            value: null,
            type: 'dateRange',
            quickFilter: true,
            props: {
              label: i18n.tr('isite.cms.label.date'),
              clearable: true
            }
          },
          fromPocketId: {
            value: null,
            type: 'select',
            quickFilter: true,
            props: {
              label: i18n.tr('iwallet.cms.origin'),
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
              label: i18n.tr('iwallet.cms.destination'),
              clearable: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qwallet.pockets'
            }
          }
        }
      }
    }
  });

  // Computed
  const computeds = {};

  // Methods
  const methods = {
  };

  // Mounted
  onMounted(() =>
  {
  });

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return { ...refs, ...(toRefs(state)), ...computeds, ...methods, store };
}
