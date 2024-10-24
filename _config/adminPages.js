export default {
  pockets: {
    permission: 'iwallet.pockets.manage',
    activated: true,
    authenticated: true,
    path: '/wallet/pockets/index',
    name: 'qwallet.admin.pockets',
    crud : import('modules/qwallet/_crud/pockets'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'iwallet.cms.sidebar.adminPockets',
    icon: 'fa-light fa-sack-dollar'
  },
  transactions: {
    permission: 'iwallet.transactions.manage',
    activated: true,
    authenticated: true,
    path: '/wallet/transactions/index',
    name: 'qwallet.admin.transactions',
    page: () => import('modules/qwallet/_pages/admin/transactions'),
    layout: () => import('layouts/master.vue'),
    title: 'iwallet.cms.sidebar.adminTransactions',
    icon: 'fa-light fa-wallet'
  }
}
