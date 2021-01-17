import { OnDestroy, Directive } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseControl implements OnDestroy {
  protected ngUnSubscribe = new Subject();
  constructor() {}

  ngOnDestroy() {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
    this.ngUnSubscribe.unsubscribe();
  }
}
