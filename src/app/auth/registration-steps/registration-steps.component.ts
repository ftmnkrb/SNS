import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateService } from 'src/app/shared/services/state.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../auth.service';
import { UserDto } from '../models/UserDto';

import uniData from './university.json';

@Component({
  selector: 'registration-steps',
  templateUrl: './registration-steps.component.html',
  styleUrls: ['./registration-steps.component.scss'],
})
export class RegistrationStepsComponent implements OnInit {

  universities: Uni[] = uniData
  filteredUniversities: Observable<Uni[]> | null = null;
  profilePhotoPath: string = "";

  nameFG = this._formBuilder.group({
    name: ['', Validators.required],
  });
  universityFG = this._formBuilder.group({
    university: ['', Validators.required],
  });
  departmentFG = this._formBuilder.group({
    department: ['', Validators.required],
  });
  classFG = this._formBuilder.group({
    class: ['', Validators.required],
  });
  descriptionFG = this._formBuilder.group({
    description: ['', Validators.required],
  });
  photoUrlFG = this._formBuilder.group({
    department: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, private userService: UserService, private authService: AuthService, private alertService: AlertService, private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.filteredUniversities = this.universityFG.get('university')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value!)),
    );

  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    description: new FormControl(''),
    // photoUrl: new FormControl('')
  });

  get formArray(): AbstractControl | null { return this.form.get('formArray'); }

  private _filter(name: string): Uni[] {
    const filterValue = name.toLowerCase();

    return this.universities.filter(universities => universities.name.toLowerCase().includes(filterValue));
  }

  uploadFinished(event: any) {
    // this.profilePhotoPath = this.createImgPath(event.dbPath)
  }

  updateUser() {
    this.stateService._loading.next(true);
    const id = JSON.parse(localStorage.getItem('localId')!);

    if (id) {
      let updatedUser: UserDto = {
        name: this.nameFG.get('name')?.value!,
        university: this.universityFG.get('university')?.value!,
        department: this.departmentFG.get('department')?.value!,
        description: this.descriptionFG.get('description')?.value!,
        class: +this.classFG.get('class')?.value!,
        verified: true,
        localId: id,
        email: null
      }
      this.userService.updateUser(id, updatedUser).subscribe({
        next: (userDto) => {
          this.userService.user.next(userDto);
          this.alertService.success("Registration Successful. WELCOME " + userDto.name?.toUpperCase());
          this.router.navigate(["/"]);
          localStorage.setItem('verified', JSON.stringify(true))
        },
        error: (err) => {
        },
        complete: () => {
          this.stateService._loading.next(false);
        }
      })
    } else {
      this.stateService._loading.next(false);
    }
  }
}

export interface Uni {
  name: string;
}