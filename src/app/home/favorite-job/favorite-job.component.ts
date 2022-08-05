import { Component, Input, OnInit } from '@angular/core';
import { JobPostingEntity } from 'src/app/core/models/job.model';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-favorite-job',
  template: `<i
    (click)="favorite()"
    [ngClass]="isFavorite ? 'pi pi-heart-fill likeButton' : 'pi pi-heart'"
  ></i>`,
  styleUrls: ['./favorite-job.component.scss'],
})
export class FavoriteJobComponent implements OnInit {
  isFavorite: boolean = false;
  currentUser = JSON.parse(localStorage.getItem('user')!);
  @Input() job!: JobPostingEntity;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.getfavorited();
  }

  getfavorited() {
    if (this.job.favoritedBy) {
      for (let user in this.job.favoritedBy) {
        if (this.job.favoritedBy[user].email == this.currentUser.email) {
          this.isFavorite = true;
        }
      }
    }
  }

  favorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite == true) {
      if (this.job.favoritedBy != undefined) {
        this.job.favoritedBy.push(this.currentUser);
        this.jobService.updateJob(this.job);
      }
      this.job.favoritedBy = [];
      this.job.favoritedBy.push(this.currentUser);
      this.jobService.updateJob(this.job);
    } else if (this.isFavorite == false) {
      this.job.favoritedBy?.pop();
      console.log(this.job.favoritedBy);
      this.jobService.updateJob(this.job);
    }
  }
}
