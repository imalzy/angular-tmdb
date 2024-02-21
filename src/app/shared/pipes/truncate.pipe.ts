import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(str: string, length = 10) {
    if (!str && typeof str !== 'string') return '';

    if (str.length < length) {
      return str;
    } else {
      return str.substring(0, length - 3) + '...';
    }
  }
}
