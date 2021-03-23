import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) { }

  public getComments() {
    return this.httpClient.get(this.url +
      `comment?filter={
        "order": "timestamp ASC",
        "fields": {
          "id": true,
          "userId": true,
          "comment": true,
          "subReddit": true,
          "timestamp": true,
          "emotion": true,
          "scorePerUser": true
        }
      }`
    )
  }
}