import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from "src/app/core/http.service";
import { Category, Subcategory } from "src/app/interface/skill-category.interface";
import { TabHelper } from "src/app/utils/tabs/add-tabs";

@Component({
  selector: "app-skillset",
  templateUrl: "./skillset.component.html",
  styleUrls: ["./skillset.component.scss"],
})
export class SkillsetComponent implements OnInit {
  activeTab: string = "frontend-tab";
  showPopup: boolean = false;
  showDeleteTabPopup: boolean = false;
  showAddCategoryPopup: boolean = false;
  categoryForm!: FormGroup;
  skillsetForm!: FormGroup;
  categories: Category[] = [
    {
      id: 1,
      name: "Front-end",
      longName: "Front end web development",
      tabName: "frontend-tab",
      subcategory: [
        {
          id: 1,
          name: "Angular",
        },
      ],
    },
    {
      id: 2,
      name: "Back-end",
      longName: "Backend development",
      tabName: "backend-tab",
      subcategory: [
        {
          id: 1,
          name: "MongoDB",
        },
      ],
    },
  ];

  constructor(private fb: FormBuilder, private httpService : HttpService) {}

  ngOnInit(): void {
    this.httpService.get('/skills').subscribe(i=>{
      this.categories = i; // TO DO MAP SUBCATEGORIES
    })
    this.categoryForm = this.fb.group({
      categoryName: ["", Validators.required],
    });
    this.skillsetForm = this.fb.group({
      category: ["", Validators.required],
      subcategory: ["", Validators.required],
    });
  }
  get formControls() {
    return this.skillsetForm.controls;
  }
  // switchTab(tabId: string) {
  //   this.activeTab = tabId;
  // }

  switchTab(event: Event, tabId: string): void {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }

    const tabSwitchBtns = document.getElementsByClassName("tab-switch-btn");
    for (let i = 0; i < tabSwitchBtns.length; i++) {
      tabSwitchBtns[i].classList.remove("active");
    }

    const tab = document.getElementById(tabId);
    const tabSwitchBtn = event.currentTarget as HTMLButtonElement;

    if (tab) {
      tab.classList.add("active");
      tabSwitchBtn.classList.add("active");
    }
  }
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  addSkillset() {
    if (this.skillsetForm.valid) {
      const category = this.skillsetForm.get('category')?.value;
      const subcategory = this.skillsetForm.get('subcategory')?.value;
      const cat: Category= this.categories.find((cat) => cat.name === category) as Category;

      if (cat) {
        const lastSubCatIndex = cat.subcategory?.slice(-1)[0]?.id || 0;
        const obj = {
          id: lastSubCatIndex,
          name: subcategory,
        };
        cat.subcategory = [...cat.subcategory, obj];
      }

      this.skillsetForm.reset();
    }
    this.closePopup();
  }

  openDeleteTabPopup() {
    this.showDeleteTabPopup = true;
  }

  closeDeleteTabPopup() {
    this.showDeleteTabPopup = false;
  }

  deleteTab() {
    // Delete tab logic here
    this.closeDeleteTabPopup();
  }

  openAddCategoryPopup() {
    this.showAddCategoryPopup = true;
  }

  closeAddCategoryPopup() {
    this.showAddCategoryPopup = false;
  }

  addCategory(): void {
    if (this.categoryForm.valid) {
      const categoryName = this.categoryForm.get("categoryName")?.value;
      this.httpService.post('/skills',{name:categoryName})
      const lastCategory = this.categories[this.categories.length - 1];
      const id = (lastCategory?.id || 0) + 1;
      const categoryLongName = categoryName;
      const tabName = TabHelper.getTabNames(categoryName);
      const newCategory = {
        id,
        name: categoryName,
        longName: categoryLongName,
        tabName: tabName,
        subcategory: [],
      };
      this.categories.push(newCategory);
    }
  }
}
