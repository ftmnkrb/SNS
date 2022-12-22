import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserDto } from 'src/app/auth/models/UserDto';
import { UserService } from 'src/app/shared/services/user.service';
import { Content } from '../../Content';
import { ContentService } from '../../content.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnChanges  {
  @Input() content: Content | null = null;

  user: UserDto | null = null;

  contentUser: UserDto | undefined = undefined;

  constructor(private userService: UserService, private contentService: ContentService) {
    this.userService.user.subscribe(user => {
      this.user = user;
    })

    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.content?.userLocalId);
    this.userService.getUserById(this.content?.userLocalId!).subscribe(user=>{
      console.log(user);
      this.contentUser = user;
    })
  }

  getContentHeader(name: string): string {
    return name.slice(0, 1).toUpperCase();
  }

  deleteContent(content: Content | null) {
    if (content) {
      this.contentService.deleteContent(content).subscribe(res=>{
        console.log(res);
      })
    }
  }
}
