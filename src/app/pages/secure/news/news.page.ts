import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from 'src/app/models/interfaces/article';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  content_loaded = false;
  skeletonItems = new Array(20);
  articles: Article[];

  constructor(
    private newsService: NewsService,
    public navController: NavController) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {

    this.content_loaded = false;

    this.newsService.getNews()
    .then(value => {

      if(value != null){
        setTimeout(() => {
          this.articles = value;
          this.content_loaded = true;
        }, 2000);
      }

    }).catch(error => {
      this.content_loaded = true;
    });
  }

  goToNewsDetails(article: Article){
    this.newsService.selectedArticle = article;
    this.navController.navigateForward('news/details', { state: article });
  }
}
