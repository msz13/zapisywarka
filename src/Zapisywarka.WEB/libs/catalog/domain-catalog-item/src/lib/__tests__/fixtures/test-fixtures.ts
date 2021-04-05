export const CATEGORIES_RAW = {
  1: { id: 1, name: 'Bochenki' },
  2: { id: 2, name: 'Foremkowe' },
};

export const CATALOG_ITEMS = [
  {
    id: 6,
    name: 'Foremkowy z żurawiną',
    categoryId: 2,
    price: 6,
    avaibleQuantity: 40,
  },
  {
    id: 5,
    name: 'Foremkowy tradycyjny',
    categoryId: 2,
    price: 6,
    avaibleQuantity: 40,
  },
  {
    id: 2,
    name: 'Bochenek francuski',
    categoryId: 1,
    price: 9,
    avaibleQuantity: 60,
  },
  {
    id: 1,
    name: 'Bochenek tradycyjny',
    categoryId: 1,
    price: 9,
    avaibleQuantity: 60,
  },
];

export const FILTERED_BY_CATEGORY = [
  {
    id: 2,
    name: 'Bochenek francuski',
    categoryId: 1,
    price: 9,
    avaibleQuantity: 60,
  },
  {
    id: 1,
    name: 'Bochenek tradycyjny',
    categoryId: 1,
    price: 9,
    avaibleQuantity: 60,
  },
];

export const FILTERED_BY_NAME = [
  {
    id: 5,
    name: 'Foremkowy tradycyjny',
    categoryId: 2,
    price: 6,
    avaibleQuantity: 40,
  },
  {
    id: 1,
    name: 'Bochenek tradycyjny',
    categoryId: 1,
    price: 9,
    avaibleQuantity: 60,
  },
];

export const FILTERED_BY_NAME_AND_CATEGORY = [
  {
    id: 1,
    name: 'Bochenek tradycyjny',
    categoryId: 1,
    price: 9,
    avaibleQuantity: 60,
  },
];

export const GOUPED_BY_CATEGORY = {
  Bochenki: [
    { id: 2, name: 'Bochenek francuski', categoryId: 1 },
    {
      id: 1,
      name: 'Bochenek tradycyjny',
      categoryId: 1,
    },
  ],
  Foremkowe: [
    {
      id: 6,
      name: 'Foremkowy z żurawiną',
      categoryId: 2,
    },
    {
      id: 5,
      name: 'Foremkowy tradycyjny',
      categoryId: 2,
    },
  ],
};
