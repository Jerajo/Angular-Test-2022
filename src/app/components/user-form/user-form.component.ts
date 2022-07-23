import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup<any>({});
  user: User = {
    id: '',
    name: '',
    lastName: '',
    emails: [],
    phones: [],
  };

  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(this.user.id),
      name: new FormControl(this.user.name),
      lastName: new FormControl(this.user.lastName),
      emails: new FormArray(this.getEmailsArrayForm()),
      phones: new FormArray(this.getPhonesArrayForm()),
    });
  }

  getEmailsArrayForm(): FormControl<string | null>[] {
    const array: FormControl<string | null>[] = [];
    this.user.emails.forEach((email) => {
      array.push(new FormControl(email.address));
    });
    return array;
  }

  getPhonesArrayForm(): FormControl<string | null>[] {
    const array: FormControl<string | null>[] = [];
    this.user.phones.forEach((phone) => {
      array.push(new FormControl(phone.number));
    });
    return array;
  }
}
