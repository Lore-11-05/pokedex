import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from 'src/app/interfaces/pokemon';
import { SpokemonService } from 'src/app/services/spokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailPokemonPage implements OnInit {
  pokemon: IPokemon | null = null;
  pokemonId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: SpokemonService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokemonId = parseInt(id);
      await this.loadPokemonDetails();
    }
  }

  async loadPokemonDetails() {
    const loading = await this.loadingController.create({
      message: 'Cargando detalles...',
    });
    await loading.present();

    try {
      this.pokemon = await this.pokemonService.getPokemonById(this.pokemonId);
      console.log('Pokémon cargado:', this.pokemon);
    } catch (error) {
      console.error('Error loading pokemon details:', error);
    } finally {
      await loading.dismiss();
    }
  }

  getStatPercentage(stat: number): string {
    const maxStat = 255;
    return `${(stat / maxStat) * 100}%`;
  }
}