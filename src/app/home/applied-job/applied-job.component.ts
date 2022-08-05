import { Component, Input, OnInit } from '@angular/core';
import { JobPostingEntity } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-applied-job',
  template: `<p-toggleButton
    [(ngModel)]="checked"
    [disabled]="checked == false"
    onLabel="Apply"
    offLabel="Applied"
    (onChange)="apply()"
    pTooltip="Careful! Once you apply you can't take it back"
    [tooltipDisabled]="checked == false"
  ></p-toggleButton>
  <p-confirmDialog header="Confirmation" icon="pi pi-exclamation-triangle"></p-confirmDialog>`,
})
export class AppliedJobComponent implements OnInit {
  checked: boolean = true;
  currentUser = JSON.parse(localStorage.getItem('user')!);
  @Input() job!: JobPostingEntity;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getAppliedJobs();
  }

  getAppliedJobs() {
    if (this.job.appliedBy) {
      for (let user in this.job.appliedBy) {
        if (this.job.appliedBy[user].email == this.currentUser.email) {
          this.checked = false;
        }
      }
    }
  }

  apply() {
    if (this.checked == false) {
      if (this.job.appliedBy) {
        this.job.appliedBy.push(this.currentUser);
        this.jobService.updateJob(this.job);
      }
      this.job.appliedBy = [];
      this.job.appliedBy.push(this.currentUser);
      this.jobService.updateJob(this.job);
    }
  }
  
}
