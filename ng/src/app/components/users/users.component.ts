import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private api: ApiService) { }

  commentsInput: any;
  comments: any;
  connectionsInput: any;
  connections: any;
  users: any[];
  user;
  topics: any;
  filteredTopics: any;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.api.getTopics().subscribe(t => {
      this.topics = t;
    })

    this.api.getComments().subscribe((data: any) => {
      this.comments = data;
      this.users = [...new Set(data.map(x => x.userId))];
      this.users.sort(function (a, b) {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
      })
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    })

    this.api.getConnections().subscribe((data: any) => {
      this.connections = data;
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterUser(user) {
    this.myControl.setValue(user);
    this.user = user;
    this.commentsInput = [...this.comments.filter(x => x.userId == this.user)];
    this.filteredTopics = [...this.topics.filter(x => x.user == this.user)];
    this.connectionsInput = [...this.connections.filter(x => x.fromAuthor == this.user)];
  }
}
