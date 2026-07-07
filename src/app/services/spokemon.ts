import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPokemon } from '../interfaces/ipokemon';

@Injectable({
  providedIn: 'root'
})
export class SPokemon {
  private apiUrl = 'https://pokeapi.co/api/v2';
  private offset: number = 0;
  private limit: number = 20;

  constructor(private http: HttpClient) {}

  async getPokemons(): Promise<IPokemon[]> {
    const response: any = await this.http.get(`${this.apiUrl}/pokemon?limit=${this.limit}&offset=${this.offset}`).toPromise();
    this.offset += this.limit;
    
    return response.results.map((item: any, index: number) => {
      const id = this.offset - this.limit + index + 1;
      return {
        id: id,
        name: item.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        type1: 'normal',
        weight: 0,
        height: 0,
        abilities: [],
        stats: []
      };
    });
  }

  async getPokemon(id: number): Promise<IPokemon> {
    const response: any = await this.http.get(`${this.apiUrl}/pokemon/${id}`).toPromise();
    
    return {
      id: response.id,
      name: response.name,
      sprite: response.sprites.other?.['official-artwork']?.front_default || response.sprites.front_default,
      type1: response.types[0]?.type.name || 'normal',
      type2: response.types[1]?.type.name,
      weight: response.weight / 10,
      height: response.height / 10,
      abilities: response.abilities.map((a: any) => a.ability.name),
      hiddenAbility: response.abilities.find((a: any) => a.is_hidden)?.ability.name,
      stats: response.stats.map((s: any) => ({
        name: s.stat.name,
        base_stat: s.base_stat
      }))
    };
  }
}