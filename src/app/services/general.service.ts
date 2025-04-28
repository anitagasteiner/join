import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  activeNavBtn: string = 'summary';

  constructor() { }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }  

}