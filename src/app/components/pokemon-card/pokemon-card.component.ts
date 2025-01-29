import { Component, inject, input, InputSignal, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { Pokemon } from '../../models/pokemon.model'
import { PokemonTypeToIconProperties } from '../../utils/pokemon.utils'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { trigger, transition, style, animate, state } from '@angular/animations'

@Component({
    selector: 'app-pokemon-card',

    imports: [CommonModule],
    templateUrl: './pokemon-card.component.html',
    styleUrl: './pokemon-card.component.css',
    animations: [
        trigger('cardAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
                animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
            ]),
            transition(':leave', [animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.9)' }))]),
        ]),
        trigger('hoverAnimation', [
            state(
                'normal',
                style({
                    transform: 'translateY(0)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                })
            ),
            state(
                'hovered',
                style({
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                })
            ),
            transition('normal <=> hovered', animate('150ms ease-in-out')),
        ]),
    ],
})
export class PokemonCardComponent implements OnInit {
    router = inject(Router)
    pokemon: InputSignal<Pokemon> = input.required()
    backgroundColor!: string
    pokemonTypeIcon!: string
    hoverState: 'normal' | 'hovered' = 'normal'
    ngOnInit(): void {
        this.backgroundColor = PokemonTypeToIconProperties[this.pokemon().type].color
        this.pokemonTypeIcon = PokemonTypeToIconProperties[this.pokemon().type].imageUrl
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.backgroundColor = PokemonTypeToIconProperties[this.pokemon().type].color
        this.pokemonTypeIcon = PokemonTypeToIconProperties[this.pokemon().type].imageUrl
    }

    onSelectPokemon(): void {
        console.log(this.router.url)
        if (this.router.url === '/pokemons') {
            console.log('from /pokemon')
            this.router.navigate(['pokemon', this.pokemon().id])
        }
    }
}
