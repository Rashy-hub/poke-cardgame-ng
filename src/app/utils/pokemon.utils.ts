// enum qui associe monster.type à une couleur

enum PokemonType {
    Fire = 'fire',
    Water = 'water',
    Plant = 'plant',
    Electric = 'electric',
}

enum BackgroundColor {
    Red = 'rgb(255, 99, 71)', // Tomate,
    Blue = 'rgb(70, 130, 180)', // SteelBlue,
    Green = 'rgb(60, 179, 113)', // MediumSeaGreen,
    Yellow = 'rgb(255, 215, 0)', // Gold
}

const PokemonTypeToIconProperties = {
    [PokemonType.Fire]: {
        color: BackgroundColor.Red,
        imageUrl: 'fire_icon.png',
    },
    [PokemonType.Water]: {
        color: BackgroundColor.Blue,
        imageUrl: 'water_icon.png',
    },
    [PokemonType.Plant]: {
        color: BackgroundColor.Green,
        imageUrl: 'plant_icon.png',
    },
    [PokemonType.Electric]: {
        color: BackgroundColor.Yellow,
        imageUrl: 'electric_icon.png',
    },
}

export { PokemonType, BackgroundColor, PokemonTypeToIconProperties }
