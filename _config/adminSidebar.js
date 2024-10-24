import pages from 'src/setup/pages'; // Get Pages from config

//Blog
export default [
  {
    title: 'iwallet.cms.sidebar.adminGroup',
    icon: 'fa-light fa-wallet',
    children: [
      pages.qwallet.pockets,
      pages.qwallet.transactions
    ]
  }
];
