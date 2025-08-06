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
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  patients: any[] = [];
  searchTerm: string = '';
  filteredPatients: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pagedPatients: any[] = [];

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAll().subscribe((data: any) => {
      this.patients = data;
      this.filteredPatients = data;
      this.updatePagination();
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

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedPatients = this.filteredPatients.slice(start, end);
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredPatients = this.patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(term) ||
        patient.id.toString().includes(term)
    );
    this.currentPage = 1; // resetar pra primeira página ao filtrar
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredPatients.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
