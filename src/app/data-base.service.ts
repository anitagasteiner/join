import { Injectable, NgZone } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(private firestore: Firestore, private ngZone: NgZone) {}
  
  getData(data: string): Observable<any[]> {
    const dataCollection = collection(this.firestore, data);
    return collectionData(dataCollection, { idField: 'id' });
  }

  async addData(collectionName: string, data: any): Promise<any> {
    return this.ngZone.run(() => { // Diese Firebase-Operation wird innerhalb der Angular-Zone ausgeführt, damit Change Detection zuverlässig funktioniert.
      const collectionRef = collection(this.firestore, collectionName);
      return addDoc(collectionRef, data);
    });
  }

  async updateData(collectionName: string, docId: string, newData: any): Promise<void> {
    const docRef = doc(this.firestore, collectionName, docId);
    return this.ngZone.run(() => {
      return updateDoc(docRef, newData);
    });
  }

}
