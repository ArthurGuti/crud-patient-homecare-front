import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-patient-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  currentPage: number = 1;
  searchTerm: string = '';
  totalPages: number = 1;
  notFound: boolean = false;

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  // loadPatients() {
  //   this.patientService.getAll().subscribe((data: any) => {
  //     this.patients = data;
  //   });
  // }

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

  loadPatients(page: number = 1) {
    this.patientService.getPatients(page, this.searchTerm).subscribe({
      next: (res) => {
        this.patients = res.data;
        this.currentPage = res.current_page;
        this.totalPages = res.last_page;
        this.notFound = this.patients.length === 0;
      },
      error: (err) => {
        if (err.status === 404) {
          this.patients = [];
          this.notFound = true;
        } else {
          console.error('Erro ao buscar pacientes:', err);
        }
      },
    });
  }

  onSearchChange() {
    this.currentPage = 1;
    this.loadPatients(1);
  }

  viewPatient(id: number) {
    this.router.navigate(['/patients/view', id]);
  }
}
