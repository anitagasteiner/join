import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private selectedContactSubject = new BehaviorSubject<any>(null); // Ein BehaviorSubject ist eine spezielle Art von Subject, das den neuesten Wert speichert und diesen Wert sofort an neue Abonnenten weitergibt.
  selectedContact$ = this.selectedContactSubject.asObservable(); // Das $-Suffix deutet an, dass es sich um einen Observable-Stream handelt.    

  activeNavBtn: string = 'summary';

  addContactFormOpened: boolean = false;
  editContactFormOpened: boolean = false;
  contactToBeEdited: Contact | null = null;
  contactToBeDeleted: Contact | null = null;

  setSelectedContact(contact: Contact) {
    this.selectedContactSubject.next(contact); // Wenn this.selectedContactSubject.next(contact) aufgerufen wird, wird der Wert aktualisiert, und alle Abonnenten des selectedContact$-Streams erhalten sofort den neuen Wert.
  }

  showEditContactForm(contact: Contact) {
    console.log('edit contact form opened');
    // console.log(contact);
    this.contactToBeEdited = contact;
    this.editContactFormOpened = true;
  }

  hideContactForm() {
    this.addContactFormOpened = false;
    this.editContactFormOpened = false;
    this.contactToBeEdited = null;
  }

  deleteContact(contact: Contact) {    
    this.contactToBeDeleted = contact;
    console.log('you want to delete this contact: ', this.contactToBeDeleted);
  }

}
