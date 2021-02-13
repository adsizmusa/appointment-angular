import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { ProductsDTO } from 'src/app/core/models/products.DTO';
import { ProductService } from 'src/app/core/services/product.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-product-create-and-update',
  templateUrl: './product-create-and-update.component.html',
  styleUrls: ['./product-create-and-update.component.css'],
})
export class ProductCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  productsDTO: ProductsDTO = new ProductsDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productService: ProductService) {
    super();
  }

  ngOnInit() {}
  show(productsDTO: ProductsDTO) {
    const me = this;
    me.productsDTO = productsDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.productsDTO.id == 0) {
      me.productService
        .postProducts(me.productsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.productService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.productService
        .putProducts(me.productsDTO.id, me.productsDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.productService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
}
