import { PokemonType } from '../utils/pokemon.utils'

export class Pokemon {
    name: string = 'Pokemon'
    image: string = '/default.png'
    type: PokemonType = PokemonType.Electric
    hp: number = 0
    figureCaption: string = 'figure desc'
    attackName: string = 'standard attack'
    attackStrength: number = 0
    attackDescription: string = 'attack description ...'

    deepCopy(): Pokemon {
        return structuredClone(this)
    }
}
