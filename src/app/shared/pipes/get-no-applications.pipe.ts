import { Pipe, PipeTransform } from '@angular/core';
import { UserEntity } from 'src/app/core/models/user.model';

@Pipe({
  name: 'getNoApplications',
})
export class GetNoApplicationsPipe implements PipeTransform {
  transform(value: UserEntity[]): number {
    if (value) {
      return value.length;
    }
    return 0;
  }
}
