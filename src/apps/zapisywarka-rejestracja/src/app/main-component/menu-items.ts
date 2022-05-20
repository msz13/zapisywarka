export interface MenuItem {
  title: string;
  link: string;
  children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Start',
    link: 'main/start',
  },
  {
    title: 'Dodaj zamówienie',
    link: 'main/nowe-zamowienie',
  },
  {
    title: 'Potwierdź odbiór',
    link: 'main/odbiory',
  },
  {
    title: 'Oferty',
    link: '/main/oferty',
  },
  {
    title: 'Katalog pozycji',

    link: '/main/katalog/',
    children: [
      {
        title: 'Pozycje',
        link: '/main/katalog/pozycje',
      },
      {
        title: 'Nowa Pozycja',
        link: '/main/katalog/nowa pozycja',
      },
      {
        title: 'Kategorie',
        link: '/main/katalog/kategorie',
      },
    ],
  } /*{
        title: "Raporty",
        link: "main/raporty"
    } */,
];
