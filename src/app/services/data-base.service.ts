import { Injectable, NgZone } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, Timestamp, updateDoc, WithFieldValue } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private firestore: Firestore, private ngZone: NgZone) {}
  
  getData<T extends object>(data: string): Observable<T[]> { // Mit <T> typisiere ich den Rückgabewert, damit ich zB direkt Observable<Contact[]> bekomme.
    const dataCollection = collection(this.firestore, data); // Ich hole mir eine Collection aus Firestore.

    return collectionData(dataCollection, { idField: 'id' }).pipe(
      map(items =>
        items.map(item => {
          const converted: any = { ...item };  
          // Timestamp → Date konvertieren (nur für bekannte Timestamp-Felder)
          if (converted.date instanceof Timestamp) {
            converted.date = converted.date.toDate();
          }  
          return converted as T;
        })
      )
    );
    //return collectionData(dataCollection, { idField: 'id' }) as Observable<T[]>; // Alle Dokumente dieser Collection werden als Observable gelesen. Mit { idField: 'id' } wird die Firebase-Dokument-ID automatisch als Feld 'id' ins Ergebnisobjekt eingebunden.
  }

  async addData<T extends WithFieldValue<DocumentData>>(collectionName: string, data: T): Promise<any> { // T extends WithFieldValue: Das ist der Typ, den Firestore für addDoc erwartet.
    return this.ngZone.run(() => { // ngZone.run sorgt dafür, dass Angular das UI korrekt aktualisiert, falls Firestore zB außerhalb von Angulars Change Detection läuft
      const collectionRef = collection(this.firestore, collectionName);
      return addDoc(collectionRef, data);
    });
  }

  async updateData<T extends { [key: string]: any }>(collectionName: string, docId: string, newData: T): Promise<void> { // T extends { [key: string]: any } -> Das ist, was updateDoc intern braucht - ein beliebiges Objekt mit Properties.
    const docRef = doc(this.firestore, collectionName, docId);
    return this.ngZone.run(() => {
      return updateDoc(docRef, newData);
    });
  }

  async deleteData(collectionName: string, docId: string): Promise<void> {
    const docRef = doc(this.firestore, collectionName, docId);
    return this.ngZone.run(() => deleteDoc(docRef));
  }

}
