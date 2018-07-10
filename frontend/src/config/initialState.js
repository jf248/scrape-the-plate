export default {
  crud: {
    resources: {
      recipes: {
        list: {
          ids: [36, 47],
          total: 2,
          params: {
            sort: null,
            order: null,
            page: 1,
            perPage: null,
            filter: {},
          },
        },
        data: {
          47: {
            id: 47,
            title: 'Peanut butter sandwich',
            ingredients: [
              { text: 'some peanut butter' },
              { text: '2 slices of bread' },
            ],
            preparation: [
              'Spread the peanut butter on one slice of bread.',
              'Put the second slice on top.',
            ],
          },
          36: {
            id: 36,
            title: 'Salted water for boiling',
            ingredients: [{ text: 'some salt' }, { text: 'water' }],
            preparation: ['Add salt to the water.', 'Stir.'],
          },
        },
      },
    },
  },
};
