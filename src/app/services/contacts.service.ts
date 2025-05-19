import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact.model';
import { DataBaseService } from './data-base.service';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private selectedContactSubject = new BehaviorSubject<any>(null); // Ein BehaviorSubject ist eine spezielle Art von Subject, das den neuesten Wert speichert und diesen Wert sofort an neue Abonnenten weitergibt.
  selectedContact$ = this.selectedContactSubject.asObservable(); // Das $-Suffix deutet an, dass es sich um einen Observable-Stream handelt.

  generalService = inject(GeneralService);

  addContactFormOpened: boolean = false;  
  editContactFormOpened: boolean = false;
  contactDetailsOpened: boolean = false;
  // contactDeleted: boolean = false;

  contactToBeEdited: Contact | null = null;  

  constructor(private dataBaseService: DataBaseService) { }

  setSelectedContact(contact: Contact) {
    this.selectedContactSubject.next(contact); // Wenn this.selectedContactSubject.next(contact) aufgerufen wird, wird der Wert aktualisiert, und alle Abonnenten des selectedContact$-Streams erhalten sofort den neuen Wert.
  }

  showEditContactForm(contact: Contact) {
    this.contactToBeEdited = contact;
    this.editContactFormOpened = true;
  }

  hideContactForm() {
    this.addContactFormOpened = false;
    this.editContactFormOpened = false;
    this.contactToBeEdited = null;
  }

  hideContactDetails() {
    this.contactDetailsOpened = false;
  }

  async deleteContact(contact: Contact): Promise<void> {
    const confirmed = confirm(`Delete contact "${contact.name}"?`);
    if (!confirmed) {
      return;
    }
    try {
      await this.dataBaseService.deleteData('contacts', contact.id);
      this.generalService.notificationContactDeleted = true;
      this.hideContactDetails();
      this.hideContactForm();
      setTimeout(() => {
        this.generalService.notificationContactDeleted = false;
      }, 1000);
      console.log('Kontakt gelöscht:', contact);
    } catch (error) {
      console.error('Fehler beim Löschen des Kontakts:', error);
    }
  }

}
