import { Component } from '@angular/core';
import { Content } from '../Content';
import { ContentService } from '../content.service';

@Component({
  selector: 'contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent {

  contents: Content[] = [];

  constructor(private contentService: ContentService) {
    this.contentService.allContents.subscribe(contents=>{
      this.contents = contents;
    })
  }
}
