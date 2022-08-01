import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
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
    emails: [{ id: '', address: '' }],
    phones: [{ id: '', number: '' }],
  };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [this.user.id, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      emails: new FormArray(this.getEmailsArrayForm(), [Validators.required]),
      phones: new FormArray(this.getPhonesArrayForm(), [Validators.required]),
    });
  }

  get id() {
    return this.userForm.get('id');
  }

  get name() {
    return this.userForm.get('name');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get emails() {
    return this.userForm.get('emails') as FormArray;
  }

  get phones() {
    return this.userForm.get('phones') as FormArray;
  }

  addEmail() {
    const emailControl = this.getEmailFrom('');
    this.emails.push(emailControl);
  }

  removeEmail(index: number) {
    this.emails.removeAt(index);
  }

  addPhone() {
    const phoneControl = this.getPhoneFrom('');
    this.phones.push(phoneControl);
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  getEmailsArrayForm(): FormControl<string | null>[] {
    const array: FormControl<string | null>[] = [];
    this.user.emails.forEach((email) => {
      array.push(this.getEmailFrom(email.address));
    });
    return array;
  }

  getEmailFrom(value: string): FormControl {
    return this.formBuilder.control(value, [
      Validators.required,
      Validators.email,
    ]);
  }

  getPhonesArrayForm(): FormControl<string | null>[] {
    const array: FormControl<string | null>[] = [];
    this.user.phones.forEach((phone) => {
      array.push(this.getPhoneFrom(phone.number));
    });
    return array;
  }

  getPhoneFrom(value: string): FormControl {
    return this.formBuilder.control(value, [
      Validators.required,
      Validators.pattern(''),
    ]);
  }

  saveForm() {
    this.user = this.userForm.value;
    console.log(this.user);
  }
}
