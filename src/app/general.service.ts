import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  activeNavBtn: string = 'summary';

  addContactFormOpened: boolean = false;
  editContactFormOpened: boolean = false;
  contactToBeEdited: any = null;

  showContactForm(contact: any) {
    this.contactToBeEdited = contact;
    this.editContactFormOpened = true;
  }

  hideContactForm() {
    this.addContactFormOpened = false;
    this.editContactFormOpened = false;
    this.contactToBeEdited = null;
  }

}
