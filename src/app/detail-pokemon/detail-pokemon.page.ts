import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonImg, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonGrid, IonRow, 
  IonCol, IonText, IonProgressBar, 
  IonFab, IonFabButton, IonIcon,
  LoadingController 
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SPokemon } from '../services/spokemon';
import { IPokemon } from '../interfaces/ipokemon';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonImg, 
    IonCard, 
    IonCardHeader,
    IonCardTitle, 
    IonCardContent, 
    IonGrid,
    IonRow, 
    IonCol, 
    IonText, 
    IonProgressBar,
    IonFab, 
    IonFabButton, 
    IonIcon
  ],
  templateUrl: './detail-pokemon.page.html',
  styleUrls: ['./detail-pokemon.page.scss'],
})
export class DetailPokemonPage {
  @Input() id!: number;
  private servicioPokemon = inject(SPokemon);
  private router = inject(Router);
  private loadingController = inject(LoadingController);
  pokemon!: IPokemon;

  constructor() {
    addIcons({ closeOutline });
  }

  async ionViewWillEnter() {
    console.log('El id es:', this.id);
    const loading = await this.loadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    this.servicioPokemon.getPokemon(this.id)
      .then((pokemon: IPokemon) => {
        this.pokemon = pokemon;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loading.dismiss();
      });
  }

  toNumber(value: any): number {
    return Number(value);
  }
    goBack() {
    this.router.navigate(['/list-pokemons']);
    }   
}