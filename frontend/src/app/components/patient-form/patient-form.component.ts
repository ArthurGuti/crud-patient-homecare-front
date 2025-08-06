import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-patient-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  patientId!: number;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      address: ['', Validators.required],
      phone: [''],
      medical_history: [''],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.patientId = idParam ? +idParam : 0;

    if (this.patientId) {
      this.isEditMode = true;
      this.patientService.getById(this.patientId).subscribe((data: any) => {
        this.form.patchValue(data);
      });
    }
  }

  submit() {
    if (this.isEditMode) {
      this.patientService
        .update(this.patientId, this.form.value)
        .subscribe(() => {
          this.router.navigate(['/patients']);
        });
    } else {
      this.patientService.create(this.form.value).subscribe(() => {
        this.router.navigate(['/patients']);
      });
    }
  }
}
