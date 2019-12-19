import { MemesService } from './memesService';
import { Component, OnInit } from '@angular/core';
import { IMeme } from './Meme';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private images: any;
  private MemesUrl = "https://mememzansi.conveyor.cloud/api/Memes";
  constructor(private memesService: MemesService,private loadingController: LoadingController) {}
  async ngOnInit(){
    //this.images = [0, 1, 2, 3, 4, 5, 6].map(() => `https://picsum.photos/1080/1920?random&t=${Math.random()}`);
    console.log('Fetching from service...');
    const loading = await this.loadingController.create({
      message: 'Fetching Memes...'
    });
    loading.present();
    this.memesService.getMemes()
    .subscribe(
        (data: IMeme[]) => this.images = data,
        (err: any) => {
          console.log(err);
          loading.dismiss();
        },
        () => {
          console.log('All done getting Memes');
          loading.dismiss();
        }
    );
  }

}
