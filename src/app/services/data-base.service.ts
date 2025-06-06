import { Injectable, NgZone } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc, Timestamp, WithFieldValue } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

/**
 * A service for interacting with Firestore, providing CRUD operations for collections and documents.
 */
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  /**
   * Creates an instance of DataBaseService.
   * @param firestore - Firestore instance for accessing the database.
   * @param ngZone - Angular NgZone used to ensure UI updates are handled properly.
   */
  constructor(private firestore: Firestore, private ngZone: NgZone) { }
  
  /**
   * Retrieves all documents from a Firestore collection and returns them as an observable array.
   * Converts Firestore Timestamps to JavaScript Date objects when found in the 'date' field.
   * @template T - The expected return type of the documents.
   * @param data - Name of the Firestore collection to query.
   * @returns Observable stream of typed document data with IDs included.
   */
  getData<T extends object>(data: string): Observable<T[]> {
    const dataCollection = collection(this.firestore, data); //NOTE - Ich hole mir eine Collection aus Firestore.
    return collectionData(dataCollection, { idField: 'id' }).pipe(
      map(items =>
        items.map(item => {
          const converted: any = { ...item };  
          //NOTE - Timestamp → Date konvertieren (nur für bekannte Timestamp-Felder)
          if (converted.date instanceof Timestamp) {
            converted.date = converted.date.toDate();
          }  
          return converted as T;
        })
      )
    );
    //NOTE - Mit { idField: 'id' } wird die Firebase-Dokument-ID automatisch als Feld 'id' ins Ergebnisobjekt eingebunden.
  }

  /**
   * Adds a new document to a specified Firestore collection.
   * @template T - The shape of the data being added.
   * @param collectionName - The name of the collection to add to.
   * @param data - The data object to be added as a new document.
   * @returns A promise resolving to the created document reference.
   */
  async addData<T extends WithFieldValue<DocumentData>>(collectionName: string, data: T): Promise<any> { //NOTE - T extends WithFieldValue: Das ist der Typ, den Firestore für addDoc erwartet.
    return this.ngZone.run(() => { //NOTE - ngZone.run sorgt dafür, dass Angular das UI korrekt aktualisiert, falls Firestore zB außerhalb von Angulars Change Detection läuft.
      const collectionRef = collection(this.firestore, collectionName);
      return addDoc(collectionRef, data);
    });
  }

  /**
   * Updates an existing document in the specified collection with new data.
   * @template T - The structure of the new data.
   * @param collectionName - The collection that contains the document.
   * @param docId - The ID of the document to update.
   * @param newData - The new data to replace the existing document with.
   * @returns A promise that resolves once the update is complete.
   */
  async updateData<T extends { [key: string]: any }>(collectionName: string, docId: string, newData: T): Promise<void> { //NOTE - T extends { [key: string]: any } -> Das ist, was updateDoc intern braucht - ein beliebiges Objekt mit Properties.
    const docRef = doc(this.firestore, collectionName, docId);
    return this.ngZone.run(() => {
      return setDoc(docRef, newData); //NOTE - Ersetzt das gesamte Dokument.
    });
  }

  /**
   * Deletes a document from the specified Firestore collection.
   * @param collectionName - The collection containing the document.
   * @param docId - The ID of the document to delete.
   * @returns A promise that resolves when the document is successfully deleted.
   */
  async deleteData(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(this.firestore, collectionName, docId);
    return this.ngZone.run(() => deleteDoc(docRef));
  }

}