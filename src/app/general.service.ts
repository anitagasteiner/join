import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  activeNavBtn: string = 'summary';

  addContactFormOpened: boolean = false;
  editContactFormOpened: boolean = false;

  hideContactForm() {
    this.addContactFormOpened = false;
    this.editContactFormOpened = false;    
  }

}
