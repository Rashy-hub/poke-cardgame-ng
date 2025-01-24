import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import(
                './pages/pokemons-list-page/pokemons-list-page.component'
            ).then((m) => m.PokemonsListPageComponent),
        pathMatch: 'full',
    },
]
