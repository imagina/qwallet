export default {
  pockets: {
    permission: 'iwallet.pockets.manage',
    activated: true,
    authenticated: true,
    path: '/wallet/pockets/index',
    name: 'qwallet.admin.pockets',
    page: () => import('modules/qwallet/_pages/admin/pocket'),
    layout: () => import('layouts/master.vue'),
    title: 'iwallet.cms.sidebar.adminPockets',
    icon: 'fa-light fa-newspaper'
  }
}
