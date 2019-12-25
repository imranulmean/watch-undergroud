import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AdmobFreeService } from 'src/app/services/admobfree.service';
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
  			  	private iab: InAppBrowser,private videoPlayer: VideoPlayer,
  			  	private screenOrientation: ScreenOrientation,private admob: AdmobFreeService) { 

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

	 goToChannel(url,outside,insidePlayer,streamingMedia) {
	 	console.log(url); 
	 	this.admob.InterstitialAd();	
	 	//this.iab.create(url, '_self', 'location=no');
	    if(!outside){
	        if (insidePlayer) {
	        	this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
	        	this.iab.create(url, '_self', 'location=no');
	        }
	        else{
	        	if(streamingMedia && streamingMedia==="y"){
					let options: StreamingVideoOptions = {
					  successCallback: () => { console.log('Video played') },
					  errorCallback: (e) => { console.log('Error streaming') },
					  orientation: 'landscape',
					  shouldAutoClose: true,
					  controls: true
					};

					this.streamingMedia.playVideo(url, options);				        		
	        	}
        		else{
        			this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
					this.videoPlayer.play(url).then(() => {
					 console.log('video completed');
					}).catch(err => {
					 console.log(err);
					});	        			
        		}
				
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
