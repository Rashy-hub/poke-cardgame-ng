import { Component, inject, OnInit, Signal } from '@angular/core'
import { Pokemon } from '../../models/pokemon.model'
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component'
import { CommonModule } from '@angular/common'
import { PokemonType } from '../../utils/pokemon.utils'
import { SearchBarComponent } from '../../components/search-bar/search-bar.component'
import { PokemonService } from '../../services/pokemon.service'
import { Router } from '@angular/router'

import { MatButtonModule } from '@angular/material/button'
import { BehaviorSubject, combineLatest, debounceTime, from, tap } from 'rxjs'
import { LoaderComponent } from '../../components/loader/loader.component'
import { FilterComponent } from '../../components/filter/filter.component'
import { Options } from '../../utils/filters.utils'
import { FilterService } from '../../services/filter.service'
import { trigger, transition, style, stagger, animate, query } from '@angular/animations'

@Component({
    selector: 'app-pokemons-list-page',
    imports: [PokemonCardComponent, CommonModule, SearchBarComponent, MatButtonModule, LoaderComponent, FilterComponent, FilterComponent],
    templateUrl: './pokemons-list-page.component.html',
    styleUrl: './pokemons-list-page.component.css',
    animations: [
        trigger('listAnimation', [
            transition('* => *', [
                query(
                    ':enter',
                    [
                        style({ opacity: 0, transform: 'translateY(20px)' }),
                        stagger('50ms', [animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
                    ],
                    { optional: true }
                ),
            ]),
        ]),
    ],
})
export class PokemonsListPageComponent implements OnInit {
    private pokemonsService = inject(PokemonService)
    private router = inject(Router)
    private filterService = inject(FilterService)

    public pokemons: Pokemon[] = []
    public filteredPokemons: Pokemon[] = []
    private searchTerm$ = new BehaviorSubject<string>('')

    filterByType!: Options<PokemonType>
    filterBySort!: Options<string>

    ngOnInit(): void {
        this.filterByType = {
            label: 'Type',
            value: Object.values(PokemonType),
        }
        this.filterBySort = {
            label: 'Sort by Attack',
            value: ['ASC', 'DESC'],
        }

        combineLatest([this.filterService.typeFilter$, this.filterService.attackFilter$, this.pokemonsService.getPokemons(), this.searchTerm$])
            .pipe(
                debounceTime(300),
                tap((data) => console.log(data))
            )
            .subscribe(([type, sortDirection, pokemons, searchTerm]) => {
                let filtered = this.applyFilters([...(pokemons as Pokemon[])], type, searchTerm)
                this.filteredPokemons = this.applySorting(filtered, sortDirection)
            })
    }

    onCreatePokemon() {
        this.router.navigateByUrl('/pokemon/create')
    }
    onSearchTermChange(searchTerm: string) {
        console.log(searchTerm)
        this.searchTerm$.next(searchTerm)
    }
    private normalizeString(str: string): string {
        return str
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
    }

    private applyFilters(pokemons: Pokemon[], type: string, searchTerm: string): Pokemon[] {
        const normalizedSearch = this.normalizeString(searchTerm)

        return pokemons.filter((pokemon) => {
            const typeMatch = !type || pokemon.type === type
            const searchMatch = this.normalizeString(pokemon.name).includes(normalizedSearch)
            return typeMatch && searchMatch
        })
    }

    private applySorting(pokemons: Pokemon[], direction: string): Pokemon[] {
        return [...pokemons].sort((a, b) => {
            return direction === 'ASC' ? a.attackStrength - b.attackStrength : b.attackStrength - a.attackStrength
        })
    }
}
