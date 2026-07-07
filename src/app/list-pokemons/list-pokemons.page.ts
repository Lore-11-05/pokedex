import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonCard, IonCardContent, IonRow, IonCol, IonImg, IonText, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SPokemon } from '../services/spokemon';
import { IPokemon } from '../interfaces/ipokemon';

@Component({
  selector: 'app-list-pokemons',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonGrid, IonCard, IonCardContent,
    IonRow, IonCol, IonImg, IonText,
    IonInfiniteScroll, IonInfiniteScrollContent
  ],
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage {
  pokemons: IPokemon[] = [];
  private pokemonService = inject(SPokemon);
  private router = inject(Router);

  ionViewWillEnter() {
    this.getMorePokemons();
  }

  async getMorePokemons(event?: any) {
    const promisePokemons = this.pokemonService.getPokemons();
    if (promisePokemons) {
      promisePokemons.then((pokemons: IPokemon[]) => {
        this.pokemons = this.pokemons.concat(pokemons);
      }).catch((error) => console.log(error))
      .finally(() => {
        event?.target.complete();
      });
    }
  }

  goToPage(pokemon: IPokemon) {
    this.router.navigate(['detail-pokemon', pokemon.id]);
  }
}