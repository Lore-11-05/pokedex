import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { IPokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class SpokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private nextUrl: string | null = `${this.baseUrl}?limit=20&offset=0`;

  constructor() { }

  async getPokemons(): Promise<IPokemon[] | null> {
    if (!this.nextUrl) {
      return null;
    }

    try {
      const response: HttpResponse = await CapacitorHttp.get({
        url: this.nextUrl,
        params: {}
      });

      if (response.data) {
        const result = response.data.results;
        this.nextUrl = response.data.next;
        
        const pokemons: IPokemon[] = [];
        const promises = result.map((pokemon: any) => {
          return CapacitorHttp.get({
            url: pokemon.url,
            params: {}
          });
        });

        const responses = await Promise.all(promises);
        responses.forEach((respPokemon: any) => {
          const pokemon = this.processPokemon(respPokemon.data);
          pokemons.push(pokemon);
        });

        return pokemons;
      }
      return null;
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      return null;
    }
  }

  private processPokemon(pokemonData: any): IPokemon {
    const pokemon: IPokemon = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.other?.['official-artwork']?.front_default || pokemonData.sprites.front_default,
      types: pokemonData.types.map((t: any) => t.type.name),
      type1: pokemonData.types[0]?.type.name || '',
      height: pokemonData.height / 10,
      weight: pokemonData.weight / 10,
      stats: {
        hp: pokemonData.stats[0]?.base_stat || 0,
        attack: pokemonData.stats[1]?.base_stat || 0,
        defense: pokemonData.stats[2]?.base_stat || 0,
        specialAttack: pokemonData.stats[3]?.base_stat || 0,
        specialDefense: pokemonData.stats[4]?.base_stat || 0,
        speed: pokemonData.stats[5]?.base_stat || 0
      }
    };

    if (pokemonData.types[1]) {
      pokemon.type2 = pokemonData.types[1].type.name;
    }

    const hiddenAbility = pokemonData.abilities.find((ability: any) => ability.is_hidden);
    if (hiddenAbility) {
      pokemon.hiddenAbility = hiddenAbility.ability.name;
    }

    return pokemon;
  }

  getPokemonById(id: number): Promise<IPokemon | null> {
    return new Promise((resolve, reject) => {
      CapacitorHttp.get({
        url: `${this.baseUrl}/${id}`,
        params: {}
      })
      .then((response: HttpResponse) => {
        if (response.data) {
          resolve(this.processPokemon(response.data));
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        console.error('Error fetching pokemon by id:', error);
        reject(error);
      });
    });
  }
}