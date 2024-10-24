import baseService from 'modules/qcrud/_services/baseService';

export default {
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
