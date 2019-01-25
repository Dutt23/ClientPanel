import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
// Collection is used to fetch all.
// Document is used to fetch one.

import { Observable } from "rxjs";
import { Client } from "../models/Client";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  constructor(private angularFireStore: AngularFirestore) {
    this.clientsCollection = this.angularFireStore.collection("clients", ref =>
      ref.orderBy("lastName", "asc")
    );
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.clients;
  }

  addNewClient(client: Client) {
    this.clientsCollection.add(client);
  }
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.angularFireStore.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) return null;
        else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }
  updateClient(client: Client) {
    this.clientDoc = this.angularFireStore.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
  deleteClient(client: Client) {
    this.clientDoc = this.angularFireStore.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
