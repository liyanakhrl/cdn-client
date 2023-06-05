import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { HttpService } from "src/app/core/http.service";
import { Freelancer } from "src/app/interface/freelancer.interface";
import { Skills } from "src/app/interface/skill.interface";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  @ViewChild("addSkillsInput", { static: false })
  addSkillsInput!: ElementRef<HTMLInputElement>;
  activeTabIndex: number = 0;
  userForm: FormGroup;
  isEditPopupOpen: boolean = false;
  isViewPopupOpen: boolean = false;
  isDeletePopupOpen: boolean = false;
  mode: string = "";
  showInput: boolean = false;
  filterSkills : Skills[] = [];
  freelancers!: Freelancer[];
  freelancerSkillset!: string[];
  popupVisible = false;
  selectedRow: any;
  skill!: Skills[];
  selectedNewSkillId!: any;
  inputButtonText : string = "Open"

  constructor(
    private formBuilder: FormBuilder,
    public httpService: HttpService
  ) {
    this.userForm = this.formBuilder.group({
      id: [""],
      firstName: ["", Validators.required],
      surname: ["", Validators.required],
      gender: ["", Validators.required],
      designation: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      hourlyRate: ["", Validators.required],
      skillControl: new FormArray([]),
    });
  }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
  get skillControl(): FormArray {
    return this.userForm.get("skillControl") as FormArray;
  }

  ngOnInit(): void {
    this.getFreelancer();
    this.getSkills();
  }

  getFreelancer() {
    this.httpService.get("/freelancer").subscribe((i) => {
      this.freelancers = i;
    });
  }

  getSkills() {
    this.httpService.get(`/skills`).subscribe((skill: Skills[]) => {
      this.skill = skill;
    });
  }

  getSkillValue(an: any) {
    return this.skill.filter((i) => i._id == an.value)[0].name;
  }

  addSkill() {
    
    this.showInput = !this.showInput;
    this.inputButtonText = this.showInput ? "Close" : "Open";//= "Close"
  }

  addFreelancerSkill() {
    const name = this.addSkillsInput.nativeElement.value;
    if (name) {
      const freelancerId = this.userForm.value.id;
      const skillId = this.selectedNewSkillId;
      this.httpService
        .post(`/freelancer/${freelancerId}/skills/${skillId}`, {
          name: name,
        })
        .subscribe((i) => {
          this.selectedNewSkillId = null;
        });
    } else {
      // Input field is empty
    }
  }
  getSkillName(skillId: string) {
    this.httpService.get(`/skills/${skillId}`).subscribe((i: Skills) => {
      return i.name;
    });
  }

  selectedValue!: string;

  onDropdownChange(event: any) {
    this.selectedNewSkillId = event.target.value;
  }
  addRow() {
    this.mode = "Add";
    this.popupVisible = true;
    this.selectedRow = null;
    this.userForm.reset();
  }

  viewRow(mode: string, row: Freelancer) {
    // this.userForm.reset()
    this.mode = mode;
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
      firstName: row.firstName,
      surname: row.surname,
      gender: row.gender,
      designation: row.designation,
      email: row.email,
      address: row.address,
      hourlyRate: row.hourlyRate,
      id: row._id,
    });

    if (row.skillsets?.length ?? 0 > 0) {
      for (let s of row.skillsets) {
        this.skillControl.push(new FormControl(s, Validators.required));
      }
    }
  }

  editRow(mode: string, row: any) {
    this.mode = mode;
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
      firstName: row.firstName,
      surname: row.surname,
      gender: row.gender,
      designation: row.designation,
      email: row.email,
      address: row.address,
      hourlyRate: row.hourlyRate,
      id: row._id,
    });

    if (row.skillsets?.length ?? 0 > 0) {
      for (let s of row.skillsets) {
        this.skillControl.push(new FormControl(s, Validators.required));
      }
    }
  }

  saveRow() {
    if (this.userForm.valid) {
      if (this.selectedRow) {
        // Update existing row
        const updatedRow = {
          id: this.selectedRow.id,
          name: this.userForm.get("name")?.value,
          age: this.userForm.get("age")?.value,
          email: this.userForm.get("email")?.value,
          address: this.userForm.get("address")?.value,
        };
        if (this.mode === "edit") {
          this.httpService.put("/freelancer", {
            firstName: this.userForm.get("firstName")?.value,
            surname: this.userForm.get("surname")?.value,
            gender: this.userForm.get("gender")?.value,
            designation: this.userForm.get("designation")?.value,
            email: this.userForm.get("email")?.value,
            address: this.userForm.get("address")?.value,
            hourlyRate: this.userForm.get("hourlyRate")?.value,
          });
        }
      } else {
        // Add new row
        // const obj: Freelancer = {
        //   firstName: this.userForm.get("firstName")?.value,
        //   surname: this.userForm.get("surname")?.value,
        //   gender: this.userForm.get("gender")?.value,
        //   designation: this.userForm.get("designation")?.value,
        //   email: this.userForm.get("email")?.value,
        //   address: this.userForm.get("address")?.value,
        //   hourlyRate: this.userForm.get("hourlyRate")?.value,
        //   skillsets : []
        // };
        // this.httpService.post("/freelancer", obj).subscribe((i) => {
        //   this.getFreelancer();
        // });
      }
      this.closePopup();
    }
  }

  deleteRow(mode: string, row: any) {
    this.mode = "Delete User";
    this.popupVisible = true;
    this.selectedRow = row;
    this.userForm.patchValue({
      firstName: row.firstName,
      surname: row.surname,
      gender: row.gender,
      designation: row.designation,
      email: row.email,
      address: row.address,
      hourlyRate: row.hourlyRate,
    });
  }

  removeRow() {
    const removeRow = this.freelancers.findIndex(
      (i) => this.selectedRow.id === i._id
    );
    this.freelancers.splice(removeRow, 1);
    this.closePopup();
  }

  closePopup() {
    this.resetForm()
    this.popupVisible = false;
  }

  resetForm() {
    this.userForm.reset(); // Reset the FormGroup
    this.skillControl.clear(); // Clear the FormArray
  }
}
