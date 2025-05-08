import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  activeNavBtn: string = 'summary';

  constructor() { }

  notificationOpened: boolean = false;
  notificationTaskAdded: boolean = false;
  notificationContactAdded: boolean = false;
  notificationSignedUp: boolean = false;

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }  

}