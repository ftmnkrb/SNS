import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/auth/auth.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateService } from 'src/app/shared/services/state.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Content } from '../Content';
import { ContentService } from '../content.service';

@Component({
  selector: 'new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.scss']
})
export class NewContentComponent {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective | any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize','insertImage',
      'insertVideo',]
    ]
  };

  contentForm = new FormGroup({
    department: new FormControl('', Validators.required),
    lesson: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private userService: UserService, private contentService: ContentService, private alertService: AlertService, private stateService: StateService) { }

  logout() {
    this.authService.logout();
  }

  createContent() {
    if (this.contentForm.invalid) {
      return
    }
    this.stateService.setLoading(true);
    let newContent: Content = {
      department: this.contentForm.get('department')?.value!,
      lesson: this.contentForm.get('lesson')?.value!,
      class: +this.contentForm.get('class')?.value!,
      description: this.contentForm.get('description')?.value!,
      userLocalId: this.userService.user.getValue()?.localId!
    }

    this.contentService.createContent(newContent).subscribe({
      next: (content) => {
        this.alertService.success("Successful")
        this.contentForm.reset();
        this.formDirective.resetForm();
      },
      error: (err) => {
        this.alertService.error("Err")
      },
      complete: () => {
        this.stateService.setLoading(false);
      }
    })
  }
}
