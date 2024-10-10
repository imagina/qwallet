import baseService from 'modules/qcrud/_services/baseService';

export default {
  getPockets (refresh = false): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      const requestParams = {
        refresh, params: {}
      };
      //Request
      baseService.index('apiRoutes.qwallet.pockets', requestParams).then(response =>
      {
        resolve(response);
      }).catch(error => reject(error));
    });
  },
  getTransactions (refresh = false, params = {}): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      const requestParams = { refresh, params };
      //Request
      baseService.index('apiRoutes.qwallet.transactions', requestParams).then(response =>
      {
        resolve(response);
      }).catch(error => reject(error));
    });
  }
};
