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
  comments: any;

  ngOnInit(): void {
    this.api.getComments().subscribe((data: any) => {
      this.comments = data;
      this.filterUser("zgh5002");
    })
  }

  filterUser(user) {
    this.commentsInput = [...this.comments.filter(x => x.userId == user)];
  }
}
