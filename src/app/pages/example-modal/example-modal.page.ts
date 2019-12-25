import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Channel, AllChannelService } from '../../services/all-channel.service';
@Component({
  selector: 'app-example-modal',
  templateUrl: './example-modal.page.html',
  styleUrls: ['./example-modal.page.scss'],
})
export class ExampleModalPage implements OnInit {

  featureObject:any;

  constructor(private modalController: ModalController,
			  private navParams: NavParams,private channelService: AllChannelService,) { }

  ngOnInit() {
  	this.featureObject= this.navParams.data.featureObject;
  }

	goToChannel(url,outside,insidePlayer) {
		this.channelService.goToChannel(url,outside,insidePlayer,this.featureObject.streamingMedia);
	}
	async closeModal() {
		const onClosedData: string = "Wrapped Up!";
	await this.modalController.dismiss(onClosedData);
	}  

}
