import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private selectedContactSubject = new BehaviorSubject<any>(null);
  selectedContact$ = this.selectedContactSubject.asObservable();

  activeNavBtn: string = 'summary';

  addContactFormOpened: boolean = false;
  editContactFormOpened: boolean = false;
  contactToBeEdited: any = null;

  setSelectedContact(contact: any) {
    this.selectedContactSubject.next(contact);
  }

  showEditContactForm(contact: any) {
    this.contactToBeEdited = contact;
    this.editContactFormOpened = true;
  }

  hideContactForm() {
    this.addContactFormOpened = false;
    this.editContactFormOpened = false;
    this.contactToBeEdited = null;
  }

}
