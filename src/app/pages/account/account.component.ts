import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/core/http.service';
import { Role } from 'src/app/interface/role.interface';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  activeTabIndex: number = 0;
  accountForm!: FormGroup;
  data:any;
  role!: Role[];
  constructor(private formBuilder: FormBuilder, private httpService : HttpService, public authService : AuthService) { }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

  get roles(): FormArray {
    return this.accountForm.get('roles') as FormArray;
  }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roles: new FormArray([]),
     // password: ['', Validators.required]
    });
    const username = localStorage.getItem('username');
    this.httpService.get(`/user/${username}`).subscribe(i=>{
        this.data = i;
        console.log(i)
        this.accountForm.patchValue({
          username: i.username,
          email: i.email,
        });
        let roles : any= []
        this.httpService.get(`/roles`).subscribe(i=> i = roles);

           // Clear existing roles in the FormArray
      while (this.roles.length) {
        this.roles.removeAt(0);
      }

      // Add new roles from the response to the FormArray
      i.roles.forEach((role: string) => {
        this.roles.push(new FormControl(role));
      });
    })
    this.httpService.get(`/roles`).subscribe((role:Role[])=> this.role = role);
  }

  removeRole(i:number){

  }

  getRoleName(id: string) {
    if (this.role?.length > 0) {
      console.log("rolelist",this.role)
      return this.role.filter(i=>i._id === id)[0].name;
    }
    return ""
  }

  submitForm() {
    if (this.accountForm.valid) {
      // Handle form submission here
      const selectedRoles = this.roles.controls
        .filter((control) => control.value)
        .map((control) => control.value);

      console.log(selectedRoles); // Array
    }
  }
}
