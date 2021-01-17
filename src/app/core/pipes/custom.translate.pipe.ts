import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'customtranslate',
})
export class CustomTranslatePipe
  extends TranslatePipe
  implements PipeTransform {
  transform(query: string, args: any[] = []): any {
    const value: string = query || '';
    const translatedValue: string = super.transform(value.toLowerCase(), args);

    return value.toLowerCase() === translatedValue || !translatedValue
      ? value
      : translatedValue;
  }
  constructor(translate: TranslateService, _ref: ChangeDetectorRef) {
    super(translate, _ref);
  }
}
