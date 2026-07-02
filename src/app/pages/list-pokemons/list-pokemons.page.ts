import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Router } from '@angular/router';
import { IPokemon } from 'src/app/interfaces/pokemon';
import { SpokemonService } from 'src/app/services/spokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListPokemonsPage implements OnInit {
  pokemons: IPokemon[] = [];

  constructor(
    private pokemonService: SpokemonService,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMorePokemons(null);
  }

  async getMorePokemons(event?: InfiniteScrollCustomEvent | null) {
    const loading = await this.loadingController.create({
      message: 'Cargando Pokémon...',
    });
    await loading.present();

    this.pokemonService.getPokemons()
      .then((pokemons: IPokemon[] | null) => {
        if (pokemons) {
          this.pokemons = this.pokemons.concat(pokemons);
        }
        loading.dismiss();
        if (event) {
          event.target.complete();
        }
      })
      .catch((error) => {
        console.log(error);
        loading.dismiss();
        if (event) {
          event.target.complete();
        }
      });
  }

  goToDetail(pokemonId: number) {
    this.router.navigate(['/detail-pokemon', pokemonId]);
  }
}