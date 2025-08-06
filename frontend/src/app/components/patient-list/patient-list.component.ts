import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-patient-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAll().subscribe((data: any) => {
      this.patients = data;
    });
  }

  deletePatient(id: number) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.delete(id).subscribe(() => {
        this.loadPatients();
      });
    }
  }

  editPatient(id: number) {
    this.router.navigate(['/patients/edit', id]);
  }
}
