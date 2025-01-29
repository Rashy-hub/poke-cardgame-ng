import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { environment } from '../../environment/environment'
import { catchError, finalize, Observable, of, tap } from 'rxjs'
import { Pokemon } from '../models/pokemon.model'
import { LoaderService } from './loader.service'
interface ErrorResponse {
    detail: string
}
@Injectable({
    providedIn: 'root',
})
export class PokemonService {
    constructor() {}
    httpClient = inject(HttpClient)
    loaderService = inject(LoaderService)

    getPokemons(): Observable<Pokemon[] | ErrorResponse> {
        this.loaderService.showLoader()
        return this.httpClient.get<Pokemon[] | ErrorResponse>(environment.BASE_URL + '/monsters/').pipe(
            tap((data) => {
                console.log(data)
            }),
            finalize(() => {
                this.loaderService.hideLoader()
            })
        )
    }
    getPokemon(id: string): Observable<Pokemon> {
        return this.httpClient.get<Pokemon>(environment.BASE_URL + `/monsters/${id}/`).pipe(tap((data) => console.log(data)))
    }
    createPokemon(pokemon: Pokemon) {
        return this.httpClient.post<Pokemon>(environment.BASE_URL + `/monsters/`, pokemon).pipe(tap((data) => console.log('createPokemon : ', data)))
    }
    updatePokemon(pokemon: Pokemon | null) {
        return this.httpClient.put<Pokemon>(environment.BASE_URL + `/monsters/${pokemon?.id}/`, pokemon).pipe(
            tap((data) => console.log('updatePokemon : ', data)),
            catchError((error) => {
                console.error('updatePokemon : ', error)
                return of(null)
            })
        )
    }
    deletePokemon(id: string) {
        return this.httpClient.delete(environment.BASE_URL + `/monsters/${id}/`).pipe(tap((data) => console.log('deletePokemon : ', data)))
    }
}
