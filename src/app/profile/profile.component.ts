import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { JobPostingEntity } from '../core/models/job.model';
import { UserEntity } from '../core/models/user.model';
import { JobService } from '../core/services/job.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  isLoading: boolean = false;
  currentUser: UserEntity = JSON.parse(localStorage.getItem('user')!);
  jobs: JobPostingEntity[] = [];

  constructor(
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.isLoading = true;
    this.jobService
      .getJobs()
      .pipe(tap((jobs) => (this.jobs = jobs)))
      .subscribe();
    this.isLoading = false;
  }

  logOut() {
    this.authService.logOut();
  }
}
