import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  activeTabIndex: number = 0;
  accountForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  submitForm() {
    if (this.accountForm.valid) {
      // Handle form submission here
    }
  }
}
