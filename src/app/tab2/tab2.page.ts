import { ModalPagePage } from './../modal-page/modal-page.page';
import { MemesService } from './memesService';
import { Component, OnInit } from '@angular/core';
import { IMeme } from './Meme';
import { LoadingController, ToastController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  private images: IMeme[];
  private image: IMeme;
  private comment: string;
  private likes = new Array<number>();

  constructor(private memesService: MemesService,private loadingController: LoadingController, public toastController: ToastController, 
              public modalController: ModalController) {}
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

   async send(id, comment: string){
    if (!comment) {
      const toast = await this.toastController.create({
        message: 'please add comment first',
        duration: 2000
      });
      toast.present();
      return;
    }
    this.memesService.addComment(id, comment).subscribe(
      () => {
        this.image =  this.images.find(x => x.id === id);
        this.image.comments.push({memeId: id, comment: comment});
      },
      (err: any) => {},
      () => {
       this.comment = '';
      }
    );
  }

  async like(id){
    let liked: Boolean;
    if (this.likes.find(x => x === id)) {
      liked = true;
      this.likes = this.likes.filter(x => x !== id);
      this.images.find(x => x.id === id).likes--;
    } else {
      liked = false;
      this.likes.push(id);
      this.images.find(x => x.id === id).likes++;
    }
    this.memesService.addLike(id, liked).subscribe();
  }

  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ModalPagePage,
      componentProps: {
        id: id,
        comments: this.images.find( x => x.id === id).comments,
      }
    });
    return await modal.present();
  }

}
