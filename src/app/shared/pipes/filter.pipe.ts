import { Pipe, PipeTransform } from '@angular/core';
import { JobPostingEntity } from 'src/app/core/models/job.model';
import { UserEntity } from 'src/app/core/models/user.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    jobs: JobPostingEntity[],
    jobType: 'Favorite' | 'Applied'
  ): JobPostingEntity[] {
    let currentUser: UserEntity = JSON.parse(localStorage.getItem('user')!);

    if (jobType == 'Favorite') {
      return jobs.filter((item) =>
        item.favoritedBy?.every((user) => user.email == currentUser.email)
      );
    }
    return jobs.filter((item) =>
      item.appliedBy?.every((user) => user.email == currentUser.email)
    );
  }
}
