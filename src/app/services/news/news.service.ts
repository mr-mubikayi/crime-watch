import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from 'src/app/models/interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  API_KEY = 'b7a871b4334645f8b02d6b9ee6262dae';

  selectedArticle: any;

  constructor(
    public http: HttpClient) {

  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      Accept: "*/*"
    });
  }

  getNews(): Promise<Article[]> {
    const url = `https://newsapi.org/v2/everything?domains=news24.com&apiKey=${this.API_KEY}`;

    return new Promise<Article[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
          try {
            const articles: Article[] = response.articles;
            resolve(articles);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getNew(){
    const url = 'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=GNQQN1DUTTPMX2VW'
    return this.http.get(url);
  }
}
