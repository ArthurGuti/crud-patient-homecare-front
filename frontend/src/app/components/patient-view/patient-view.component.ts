import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-view',
  standalone: true,
imports: [CommonModule, RouterModule],
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css'],
})
export class PatientViewComponent implements OnInit {
  patient: any;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientService.getPatient(+id).subscribe((res) => {
        this.patient = res;
      });
    }
  }
}
