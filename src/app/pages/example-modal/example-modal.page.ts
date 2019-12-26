import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Channel, AllChannelService } from '../../services/all-channel.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.page.html',
  styleUrls: ['./example-modal.page.scss'],
})
export class ExampleModalPage implements OnInit {

  featureObject:any;

  constructor(private modalController: ModalController,
			  private navParams: NavParams,private channelService: AllChannelService,
			  private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
  	this.featureObject= this.navParams.data.featureObject;
  	console.log(this.featureObject);
  }

	goToChannel(url,outside,insidePlayer) {
		this.channelService.goToChannel(url,outside,insidePlayer,this.featureObject.streamingMedia);
	}
	async closeModal() {
		this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
		const onClosedData: string = "Wrapped Up!";
		await this.modalController.dismiss(onClosedData);
	}  

}
