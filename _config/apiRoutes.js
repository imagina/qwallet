const moduleName = 'iwallet';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`;


export default {
  urlBase: urlBase,
  version: moduleVersion,
  transactions: `${urlBase}/transactions`,
  pockets: `${urlBase}/pockets`,
  types: `${urlBase}/types`
};
