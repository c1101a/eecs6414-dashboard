import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private api: ApiService) { }

  commentsInput: any;

  ngOnInit(): void {
    this.api.getComments().subscribe((comments: any) => {
      this.commentsInput = comments;
      console.log(this.commentsInput);
    })
  }
}
