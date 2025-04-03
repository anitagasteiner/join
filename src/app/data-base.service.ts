import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private firestore: Firestore = inject(Firestore);

  constructor() {}
  
  getData(data: string): Observable<any[]> {
    const dataCollection = collection(this.firestore, data);
    return collectionData(dataCollection, { idField: 'id' });
  }

}
