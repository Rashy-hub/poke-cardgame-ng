import { Component, input, InputSignal, OnInit } from '@angular/core'
import { Pokemon } from '../../models/pokemon.model'
import { PokemonTypeToIconProperties } from '../../utils/pokemon.utils'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-pokemon-card',
    imports: [CommonModule],
    templateUrl: './pokemon-card.component.html',
    styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent implements OnInit {
    pokemon: InputSignal<Pokemon> = input.required()
    backgroundColor!: string
    pokemonTypeIcon!: string
    ngOnInit(): void {
        this.backgroundColor = PokemonTypeToIconProperties[this.pokemon().type].color
        this.pokemonTypeIcon = PokemonTypeToIconProperties[this.pokemon().type].imageUrl
    }
}
