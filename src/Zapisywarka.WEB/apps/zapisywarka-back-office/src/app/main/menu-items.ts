import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
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
    pathMatch: 'prefix',
    link: '/main/katalog/',
    children: [
      {
        title: 'Pozycje',
        link: '/main/katalog/pozycje',
        pathMatch: 'prefix',
      },
      {
        title: 'Nowa Pozycja',
        link: '/main/katalog/nowa pozycja',
        pathMatch: 'prefix',
      },
      {
        title: 'Kategorie',
        link: '/main/katalog/kategorie',
        pathMatch: 'prefix',
      },
    ],
  } /*{
        title: "Raporty",
        link: "main/raporty"
    } */,
];
