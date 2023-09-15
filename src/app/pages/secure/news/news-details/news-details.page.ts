import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from 'src/app/models/interfaces/article';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {

  // article: Article = {
  //   source: null,
  //   author: '',
  //   title: '',
  //   description: '',
  //   url: '',
  //   urlToImage: '',
  //   publishedAt: '',
  //   content: '',
  // };

  article: any = {};

  constructor (
    private newsService: NewsService,
    private navController: NavController
  ) {
    if(this.newsService.selectedArticle != null){
      this.article = this.newsService.selectedArticle;
    }
    else{
      this.navController.navigateForward('news');
    }
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    if(this.newsService.selectedArticle != null){
      this.article = this.newsService.selectedArticle;
    }
    else{
      this.navController.navigateForward('news');
    }
  }
}
