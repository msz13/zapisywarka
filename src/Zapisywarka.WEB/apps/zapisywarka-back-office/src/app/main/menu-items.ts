import { NbMenuItem } from '@nebular/theme';


export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: "Start",
        link: "main/start"
    },
    {
        title: "Dodaj zamówienie",
        link: "main/nowe-zamowienie"
    }, {
        title: "Potwierdź odbiór",
        link: "main/odbiory"
    }, {
        title: "Oferty",
        link: "/main/oferty"
    }, {
        title: "Katalog pozycji",
        link: "/main/katalog",
        children: [{
            title: 'Kategorie',
            link: "main/katalog/kategorie"
        }]
    }/*{
        title: "Raporty",
        link: "main/raporty"
    } */
    

]