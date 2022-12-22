import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { UserDto } from 'src/app/auth/models/UserDto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateService } from 'src/app/shared/services/state.service';
import { UserService } from 'src/app/shared/services/user.service';

import uniData from '../../shared/university.json';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: UserDto | null = null;

  universities: Uni[] = uniData
  filteredUniversities: Observable<Uni[]> | null = null;

  editProfileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    university: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    description: new FormControl(''),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, private alertService: AlertService, public dialog: MatDialog, private contentService: ContentService, private stateService: StateService) {
    this.user = data.user;
    console.log(data);

    this.editProfileForm.setValue({
      class: this.user?.class!.toString()!,
      university: this.user?.university!,
      department: this.user?.department!,
      description: this.user?.description!,
      name: this.user?.name!
    })
  }

  ngOnInit(): void {
    this.filteredUniversities = this.editProfileForm.get('university')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value!)),
    );
  }

  updateProfile() {
    if (this.editProfileForm.valid) {
      this.stateService.setLoading(true);
      this.userService.updateUser(this.user?.localId!, {
        class: +this.editProfileForm.get('class')?.value!,
        department: this.editProfileForm.get('department')?.value!,
        name: this.editProfileForm.get('name')?.value!,
        description: this.editProfileForm.get('description')?.value!,
        university: this.editProfileForm.get('university')?.value!,
        email: this.user?.email!,
        localId: this.user?.localId!,
        verified: true
      }).subscribe({
        next: (user) => {
          this.alertService.success("Successfully Saved")
          this.userService.user.next(user);
          this.contentService.fetch();
          this.dialog.closeAll();
        },
        error: (err) => {
          console.log(err);
        },
        complete:()=>{
          this.stateService.setLoading(false)
        }
      })
    }
  }

  private _filter(name: string): Uni[] {
    const filterValue = name.toLowerCase();

    return this.universities.filter(universities => universities.name.toLowerCase().includes(filterValue));
  }
}

export interface Uni {
  name: string;
}