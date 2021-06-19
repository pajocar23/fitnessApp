import { Injectable } from '@angular/core';

interface consumedAmounts {
  id:string;
  consumedAmountOfWater: number;
  consumedAmountOfCalories: number;
  consumedAmountOfCarbs: number;
  consumedAmountOfProtein: number;
  consumedAmountOfFats: number;
  consumedAmountOfSleep: number;
  consumedAmountOfMindState:number;
  userId: string; //spoljni kljuc ka tabeli korisnika
  date: Date; //datum koji ce se koristiti kasnije za statistiku
}

//svaki dan kada se korisnik uloguje u app i dodje na explore(glavnu stanicu)
//prvo treba da se napravi red(slog) za taj dan 
//u kome ce vrednosti svih konzumiranih kolicina da budu
//0, a id korisnika ce biti setovan
//kao i datum i id konzumiranih kolicina u tom danu(
//kao u gornjem interfejsu prvi atribut)

//onda iz explore stranice svaki put kad se dodaje
//ili resetuje kolicina konzumirane namirnice
//to treba da se promeni u bazi

@Injectable({
  providedIn: 'root'
})
export class ConsumedAmountService {

  constructor() { }


  addDefaultConsumedIntake(){
    
  }


}
