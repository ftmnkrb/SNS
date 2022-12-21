import { Component, Input } from '@angular/core';
import { UserDto } from 'src/app/auth/models/UserDto';
import { UserService } from 'src/app/shared/services/user.service';
import { Content } from '../../Content';
import { ContentService } from '../../content.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  @Input() content: Content | null = null;

  user: UserDto | null = null;

  constructor(private userService: UserService, private contentService: ContentService) {
    this.userService.user.subscribe(user => {
      this.user = user;
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
