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

const typeToBackgroundColorMap = {
    [PokemonType.Fire]: BackgroundColor.Red,
    [PokemonType.Water]: BackgroundColor.Blue,
    [PokemonType.Plant]: BackgroundColor.Green,
    [PokemonType.Electric]: BackgroundColor.Yellow,
}
export { PokemonType, BackgroundColor, typeToBackgroundColorMap }
