import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private firestore: Firestore = inject(Firestore);

  constructor() {}
  
  getData(contacts: string): Observable<any[]> {
    const contactCollection = collection(this.firestore, contacts);
    return collectionData(contactCollection, { idField: 'id' });
  }

}
