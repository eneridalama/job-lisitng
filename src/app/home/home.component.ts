import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { JobPostingEntity } from '../core/models/job.model';
import { UserEntity } from '../core/models/user.model';
import { JobService } from '../core/services/job.service';
import { tap } from 'rxjs';

interface Wage {
  name: string;
  value: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  currentUser: UserEntity = JSON.parse(localStorage.getItem('user')!);
  jobs: JobPostingEntity[] = [];
  wageInterval: Wage[] = [];
  selectedWage: any;
  selectedJobPostingTitle: string = '';
  filteredJobPostingsTitle: any[] = [];
  isReset: boolean = false;

  constructor(
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchJobs();
    this.initializeWageDropdown();
  }

  fetchJobs() {
    this.isLoading = true;
    this.jobService
      .getJobs()
      .pipe(tap((jobs) => (this.jobs = jobs)))
      .subscribe();
    this.isLoading = false;
  }

  initializeWageDropdown() {
    this.wageInterval = [
      { name: '200', value: '200' },
      { name: '400', value: '400 ' },
      { name: '600', value: '600' },
      { name: '800', value: '800' },
      { name: '1000', value: '1000' },
      { name: '1100', value: '1100' },
      { name: '1200', value: '1200' },
    ];
  }

  selectWage(event: any) {
    if (event.value) {
      this.selectedWage = event.value!.value;
    }
  }

  filterJobsinAutocomplete(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.jobs.length; i++) {
      let job = this.jobs[i];
      if (job.title.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(job.title);
      }
    }
    this.filteredJobPostingsTitle = filtered.filter(
      (value, index) => filtered.indexOf(value) === index
    );
  }

  getFilteredJobs() {
    this.isReset = true;
    if (this.selectedJobPostingTitle) {
      this.jobs = this.jobs.filter(
        (job) => job.title == this.selectedJobPostingTitle
      );
    }
    if (this.selectedWage && this.jobs) {
      this.jobs = this.jobs.filter((job) => +job.wage! >= +this.selectedWage);
    }
    this.jobs = this.jobs;
  }

  resetFilter() {
    this.isReset = !this.isReset;
    this.selectedJobPostingTitle = '';
    this.selectedWage = null;
    this.fetchJobs();
  }

  logOut() {
    this.authService.logOut();
  }
}
