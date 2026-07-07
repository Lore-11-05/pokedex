export interface IPokemon {
  id: number;
  name: string;
  sprite: string;
  type1: string;
  type2?: string;
  weight: number;
  height: number;
  abilities: string[];
  hiddenAbility?: string;
  stats: {
    name: string;
    base_stat: number;
  }[];
}