// Import required modules
import * as fs from 'fs';
import { parse } from 'json2csv';  // npm install json2csv

// Import all Pokemon classes from your file
import * as PokemonClasses from './pokemon';  // Update with the path to your `pokemon.ts` file

// Utility function to check if a class is a Pokemon
function isPokemonClass(cls: any): boolean {
  return cls.prototype instanceof PokemonClasses.Pokemon;
}

// Utility function to convert SetSchema or other object types to readable formats
function convertSetSchemaToArray(set: any): string[] {
  return Array.from(set || []);
}

// Function to get all class names and their definitions from the imported module
function getPokemonClasses(): any[] {
  return Object.entries(PokemonClasses)
    .filter(([name, cls]) => isPokemonClass(cls))
    .map(([name, cls]) => ({ name, classDef: cls }));
}

// Function to extract data from a Pokemon instance
function extractPokemonData(pokemonInstance: any) {
  return {
    name: pokemonInstance.name,
    types: convertSetSchemaToArray(pokemonInstance.types),
    rarity: pokemonInstance.rarity,
    stars: pokemonInstance.stars,
    evolution: pokemonInstance.evolution,
    hp: pokemonInstance.hp,
    atk: pokemonInstance.atk,
    def: pokemonInstance.def,
    speDef: pokemonInstance.speDef,
    maxPP: pokemonInstance.maxPP,
    range: pokemonInstance.range,
    skill: pokemonInstance.skill,
    attackSprite: pokemonInstance.attackSprite,
  };
}

// Get all Pokemon class definitions dynamically
const pokemonClasses = getPokemonClasses();

// Create instances of each Pokemon class and extract their data
const pokemonData = pokemonClasses.map(({ name, classDef }) => {
  const instance = new classDef();  // Create an instance of the class
  return extractPokemonData(instance);  // Extract data from the instance
});

// Convert the extracted data to CSV
const csv = parse(pokemonData);

// Write the CSV data to a file
fs.writeFileSync('pokemon_data.csv', csv);
console.log('All Pokemon data has been exported to pokemon_data.csv');
