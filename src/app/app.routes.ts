import { Routes } from '@angular/router'
import { authGuard } from './guards/auth.guard'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pokemons',
        pathMatch: 'full',
    },
    {
        path: 'pokemons',
        loadComponent: () => import('./pages/pokemons-list-page/pokemons-list-page.component').then((m) => m.PokemonsListPageComponent),
        canActivate: [authGuard],
        // resolve: { pokemons: () => import('./services/pokemon.service').then((m) => m.PokemonService) },
    },
    {
        path: 'pokemon/create',
        loadComponent: () => import('./pages/pokemon/pokemon-page.component').then((m) => m.PokemonPageComponent),
        canActivate: [authGuard],
    },
    {
        path: 'pokemon/:id',
        loadComponent: () => import('./pages/pokemon/pokemon-page.component').then((m) => m.PokemonPageComponent),
        canActivate: [authGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login-page/login-page.component').then((m) => m.LoginPageComponent),
    },
    { path: '**', redirectTo: '' }, // Gérer les chemins inconnus
]
