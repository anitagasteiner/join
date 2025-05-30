import { Injectable } from '@angular/core';

/**
 * A service for managing global UI states such as active navigation button, notifications and confirmation modals.
 */
@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  /**
   * The currently active navigation button identifier.
   */
  activeNavBtn: string = 'summary';

  // Task-related notifications
  /** Flag indicating that a task was successfully added. */
  notificationTaskAdded: boolean = false;
  /** Flag indicating that a task was successfully edited. */
  notificationTaskEdited: boolean = false;
  /** Flag indicating that a task was successfully deleted. */
  notificationTaskDeleted: boolean = false;

  // Contact-related notifications
  /** Flag indicating that a contact was successfully added. */
  notificationContactAdded: boolean = false;
  /** Flag indicating that a contact was successfully edited. */
  notificationContactEdited: boolean = false;
  /** Flag indicating that a contact was successfully deleted. */
  notificationContactDeleted: boolean = false;

  /** Flag indicating that a user has successfully signed up. */
  notificationSignedUp: boolean = false;

  /** Flag indicating that an error has occurred. */
  notificationError: boolean = false;

  // Confirmation dialogs
  /** Whether the confirmation dialog for deleting a task is shown. */
  confirmationDeleteTask: boolean = false;
  /** Whether the confirmation dialog for deleting a contact is shown. */
  confirmationDeleteContact: boolean = false;

  constructor() { }

  /**
   * Capitalizes the first letter of the provided text.
   * 
   * @param text - The string to capitalize.
   * @returns The input string with the first letter capitalized.
   */
  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Displays a short error notification and hides it again after 5 seconds.
   */
  handleErrorNotification(): void {
    this.notificationError = true;
    setTimeout(() => {
      this.notificationError = false;
    }, 5000);
  }

}