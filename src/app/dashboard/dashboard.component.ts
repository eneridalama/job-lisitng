import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from '../auth/auth.service';
import { JobPostingClass, JobPostingEntity } from '../core/models/job.model';
import { UserClass, UserEntity } from '../core/models/user.model';
import { JobService } from '../core/services/job.service';
import { tap } from 'rxjs';
import { Utils } from '../core/utils/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  jobs: JobPostingEntity[] = [];
  currentUser: UserEntity = JSON.parse(localStorage.getItem('user')!);
  display: boolean = false;
  openEdit: boolean = false;
  openModal: boolean = false;
  selectedJobPost: JobPostingEntity = new JobPostingClass();
  loggedUser: UserEntity = new UserClass();

  @ViewChild('dt') dt: Table | undefined;

  constructor(
    private jobService: JobService,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private utils: Utils
  ) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.isLoading = true;
    this.jobService
      .getJobs()
      .pipe(
        tap((jobs) => {
          this.jobs = jobs.filter((job) => {
            return job.offer.email == this.currentUser.email;
          });
        })
      )
      .subscribe();
    this.isLoading = false;
  }

  handleJob(event: JobPostingEntity) {
    !this.openEdit ? this.createJob(event) : this.editJob(event);
  }

  createJob(job: JobPostingEntity) {
    this.jobService
      .addJob(job)
      .pipe(tap((_) => this.fetchJobs()))
      .subscribe();
  }

  editJob(job: JobPostingEntity) {
    this.openEdit = true;
    this.display = true;
    this.selectedJobPost = job;
    this.jobService
      .editJob(job)
      .pipe(tap((_) => this.fetchJobs()))
      .subscribe();
  }

  deleteJob(job: JobPostingEntity) {
    this.jobService
      .deleteJob(job.id!)
      .pipe(
        tap((_) => {
          this.jobs = this.jobs.filter((item) => item.id != job.id);
          this.utils.showMessage(
            'deleteToast',
            'success',
            'Success',
            'Deleted successfully'
          );
        })
      )
      .subscribe();
  }

  showDialog() {
    this.display = true;
    this.openEdit = false;
    this.selectedJobPost = {
      id: '',
      title: '',
      description: '',
      offer: new UserClass(),
      wage: undefined,
      favoritedBy: [],
      appliedBy: [],
    };
  }

  showModal(value: boolean) {
    this.openModal = this.display = value;
  }

  confirm(job: JobPostingEntity) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this job posting?',
      accept: () => {
        this.deleteJob(job);
      },
    });
  }

  applyFilterGlobal($event: any) {
    this.dt!.filterGlobal(
      ($event.target as HTMLInputElement).value,
      'contains'
    );
  }

  logOut() {
    this.authService.logOut();
  }
}
