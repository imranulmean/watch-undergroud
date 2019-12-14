import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Channel {
  id?: string;
  channelCategory: string;
}

@Injectable({
  providedIn: 'root'
})
export class AllChannelService {

	private channelCollection: AngularFirestoreCollection<Channel>;
	private channels: Observable<Channel[]>;

	constructor(db: AngularFirestore) { 

		this.channelCollection = db.collection<Channel>('allChannels');	
	    this.channels = this.channelCollection.snapshotChanges().pipe(
	      map(actions => {
	        return actions.map(a => {
	          const data = a.payload.doc.data();
	          const id = a.payload.doc.id;
	          return { id, ...data };
	        });
	      })
	    );
	}

	  getChannels() {
	    return this.channels;
	  }	
}
