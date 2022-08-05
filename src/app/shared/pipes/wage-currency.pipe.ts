import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wageCurrency',
})
export class WageCurrencyPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value == 'Not available' || value == undefined) {
      return 'Not available';
    } else {
      return value + ' €';
    }
  }
}
