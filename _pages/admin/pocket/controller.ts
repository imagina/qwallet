import { computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance } from 'vue';
import service from 'modules/qwallet/_pages/admin/pocket/services';
import store from 'modules/qwallet/_pages/admin/pocket/store';

export default function controller (props: any, emit: any)
{
  const proxy = getCurrentInstance()!.appContext.config.globalProperties;

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  };

  // States
  const state = reactive({
    selectedPocket: null,
    transactionDialog: false,
    types: {
      positive: {
        color: 'green',
        icon: 'fa-solid fa-arrow-up',
        label: '(pt) Entry'
      },
      negative: {
        color: 'red',
        icon: 'fa-solid fa-arrow-down',
        label: '(pt) Output'
      },
      transaction: {
        color: 'indigo',
        icon: 'fa-solid fa-exchange-alt',
        label: '(pt) Transaction'
      }
    },
    pockets: [
      { id: 1, name: 'Savings', total: 1500, color: '#202528', icon: 'fab fa-bitcoin', entry: 15000, output: 2500 },
      { id: 2, name: 'Expenses', total: -20000, color: '#202528', icon: 'fab fa-bitcoin', entry: 15000, output: 16000 },
      { id: 3, name: 'Investment', total: 3200, color: '#202528', icon: 'fab fa-bitcoin', entry: 15000, output: 2500 }
    ],
    transactions: [
      {
        value: 1500,
        createdAt: '2024-10-04T10:30:00',
        fromPocketName: null,
        toPocketName: 'Expenses',
        comment: 'Monthly rent payment'
      },
      {
        value: 250,
        createdAt: '2024-10-03T15:00:00',
        fromPocketName: 'Savings',
        toPocketName: null,
        comment: 'Grocery shopping at supermarket'
      },
      {
        value: 500,
        createdAt: '2024-10-02T09:45:00',
        fromPocketName: 'Income',
        toPocketName: null,
        comment: 'Salary deposit'
      },
      {
        value: 120,
        createdAt: '2024-10-01T18:20:00',
        fromPocketName: 'Savings',
        toPocketName: 'Entertainment',
        comment: 'Movie tickets for the family'
      },
      {
        value: 3000,
        createdAt: '2024-09-30T13:15:00',
        fromPocketName: null,
        toPocketName: 'Savings',
        comment: 'Freelance project payment'
      }
    ]
  });

  // Computed
  const computeds = {};

  // Methods
  const methods = {
    // methodKey: () => {}
    toggleTransactionHistory: (pocketId) =>
    {
      state.selectedPocket = state.pockets.find(pocket => pocket.id === pocketId);
      state.transactionDialog = true;
    }
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
