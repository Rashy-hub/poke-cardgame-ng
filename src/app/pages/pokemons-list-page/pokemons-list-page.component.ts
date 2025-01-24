import { Component, OnInit } from '@angular/core'
import { Pokemon } from '../../models/pokemon.model'
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component'
import { CommonModule } from '@angular/common'
import { PokemonType } from '../../utils/pokemon.utils'

@Component({
    selector: 'app-pokemons-list-page',
    imports: [PokemonCardComponent, CommonModule],
    templateUrl: './pokemons-list-page.component.html',
    styleUrl: './pokemons-list-page.component.css',
})
export class PokemonsListPageComponent implements OnInit {
    public pokemons: Pokemon[] = []
    ngOnInit(): void {
        let pokemon1 = new Pokemon()
        pokemon1.name = 'Pikachu'
        pokemon1.image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png'
        pokemon1.type = PokemonType.Electric
        pokemon1.hp = 60
        pokemon1.figureCaption = `N°${Math.floor(Math.random() * 1000)} Pikachu`
        pokemon1.attackName = 'Thunderbolt'
        pokemon1.attackStrength = 90
        pokemon1.attackDescription = 'A powerful electric attack'

        let pokemon2 = new Pokemon()
        pokemon2.name = 'Bulbasaur'
        pokemon2.image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png'
        pokemon2.type = PokemonType.Plant
        pokemon2.hp = 45
        pokemon2.figureCaption = `N°${Math.floor(Math.random() * 1000)} Bulbasaur`
        pokemon2.attackName = 'Vine Whip'
        pokemon2.attackStrength = 45
        pokemon2.attackDescription = 'A whip-like attack with vines'

        let pokemon3 = new Pokemon()
        pokemon3.name = 'Charmander'
        pokemon3.image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png'
        pokemon3.type = PokemonType.Fire
        pokemon3.hp = 39
        pokemon3.figureCaption = `N°${Math.floor(Math.random() * 1000)} Charmander`
        pokemon3.attackName = 'Flamethrower'
        pokemon3.attackStrength = 90
        pokemon3.attackDescription = 'A strong fire attack'

        let pokemon4 = new Pokemon()
        pokemon4.name = 'Squirtle'
        pokemon4.image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png'
        pokemon4.type = PokemonType.Water
        pokemon4.hp = 44
        pokemon4.figureCaption = `N°${Math.floor(Math.random() * 1000)} Squirtle`
        pokemon4.attackName = 'Water Gun'
        pokemon4.attackStrength = 40
        pokemon4.attackDescription = 'A basic water attack'

        this.pokemons = [pokemon1, pokemon2, pokemon3, pokemon4]
    }
}
