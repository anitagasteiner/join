import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  activeNavBtn: string = 'summary';

  constructor() { }

  // notificationOpened: boolean = false;
  notificationTaskAdded: boolean = false;
  notificationTaskEdited: boolean = false;
  notificationTaskDeleted: boolean = false;

  notificationContactAdded: boolean = false;
  notificationContactEdited: boolean = false;
  notificationContactDeleted: boolean = false;

  notificationSignedUp: boolean = false;

  notificationError: boolean = false;

  confirmationDeleteTask: boolean = false;
  confirmationDeleteContact: boolean = false;

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Displays a short error notification and hides it again after 1 second.
   */
  handleErrorNotification() {
    this.notificationError = true;
    setTimeout(() => {
      this.notificationError = false;
    }, 5000);
  }  

}