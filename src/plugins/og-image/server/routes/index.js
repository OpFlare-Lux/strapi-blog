module.exports = [
    {
      method: 'GET',
      path: '/get-address',
      handler: 'customController.getAddress',
      config: {
        policies: [],
      },
    },
  ];
  