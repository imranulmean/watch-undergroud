import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
export interface Channel {

}

@Injectable({
  providedIn: 'root'
})
export class AllChannelService {

	private channelCollection: AngularFirestoreCollection<Channel>;
	private featuredGamesCollection: AngularFirestoreCollection<Channel>;
	private channels: Observable<Channel[]>;
	private featuredGames: Observable<Channel[]>;
	private featuredChannel:any;

	constructor(db: AngularFirestore,
			  	private streamingMedia: StreamingMedia,
  			  	private iab: InAppBrowser,) { 

		this.channelCollection = db.collection<Channel>('allChannels');	
		this.featuredGamesCollection = db.collection<Channel>('Featured Games');

	    this.channels = this.channelCollection.snapshotChanges().pipe(
	      map(actions => {
	        return actions.map(a => {
	          const data = a.payload.doc.data();
	          const id = a.payload.doc.id;
	          return { id, ...data };
	        });
	      })
	    );

	    this.featuredGames = this.featuredGamesCollection.snapshotChanges().pipe(
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
	  getFeaturedGames() {
	    return this.featuredGames;
	  }	  

	 goToChannel(url,outside,insidePlayer) {
	 	console.log(url);
	    if(!outside){
	        if (insidePlayer) {
	        	this.iab.create(url, '_self', 'location=no');
	        }
	        else{
				let options: StreamingVideoOptions = {
				  successCallback: () => { console.log('Video played') },
				  errorCallback: (e) => { console.log('Error streaming') },
				  orientation: 'landscape',
				  shouldAutoClose: true,
				  controls: true
				};

				this.streamingMedia.playVideo(url, options);	        	
	        }
	        
	    }
	    else{
	      window['plugins'].webintent.startActivity({
	              action: window['plugins'].webintent.ACTION_VIEW,
	              url:  "googlechrome://navigate?url="+url
	          },
	          function() {},
	          function() {
	              alert('Failed to open URL via Android Intent.');
	            console.log("Failed to open URL via Android Intent.")
	          });       
	    }
	}	  	  
}
