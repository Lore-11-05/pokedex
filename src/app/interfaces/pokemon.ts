export interface IPokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  type1: string;
  type2?: string;
  hiddenAbility?: string;
  height?: number;
  weight?: number;
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}