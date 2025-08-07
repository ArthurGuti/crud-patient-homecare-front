import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  deletePatient(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Sim, Deletar!',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.delete(id).subscribe(() => {
          this.loadPatients();
          Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário deletado!',
            icon: 'success',
          });
        });
      }
    });
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
