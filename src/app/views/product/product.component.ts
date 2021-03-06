import { Component, OnInit, ViewChild } from '@angular/core';
import { confirm } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import { takeUntil } from 'rxjs/operators';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { ProductsDTO } from 'src/app/core/models/products.DTO';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { ProductService } from 'src/app/core/services/product.service';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';
import { ProductCreateAndUpdateComponent } from './product-create-and-update/product-create-and-update.component';

@Component({
  selector: 'app-costumer',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent extends BaseControl implements OnInit {
  refreshButtonOptions: any;
  addButtonOptions: any;

  pageRights: SpUserMenus = new SpUserMenus();

  @ViewChild('productCreateAndUpdateComponent', { static: false })
  private productCreateAndUpdateComponent: ProductCreateAndUpdateComponent;

  constructor(
    public productService: ProductService,
    private slideService: SlideService
  ) {
    super();
    const me = this;
    me.productService.loadServices();
  }

  ngOnInit() {
    const me = this;
    me.toolbaarButtons();
    me.pageRights = me.slideService.getPageRights(MenuEnum.Product);
  }
  _onUpdate(e) {
    const me = this;
    me.productCreateAndUpdateComponent.show(e.data);
  }
  _onDeletePage(e) {
    const me = this;
    const text: string = 'Ürün Silincek';
    const message: string =
      '<p>Ürün bilgisi Silinecek. Bunu yapmak istiyor musnuz?</p>';

    var result = confirm(message, text);
    result.then((dialogResult) => {
      if (dialogResult) {
        me.productService
          .deleteProducts(e.data.id)
          .pipe(takeUntil(me.ngUnSubscribe))
          .subscribe((sate) => {
            if (sate) {
              me.productService.loadServices();
              notify('Ürün Bilgisi başarılı bir şekilde silindi', 'success');
            } else {
              notify('Ürün Bilgisi silinirken bir hata oluştu', 'danger');
            }
          });
      }
    });
  }
  toolbaarButtons() {
    const me = this;
    me.refreshButtonOptions = {
      icon: 'refresh',
      text: 'Yenile',
      onClick: () => {
        me.productService.loadServices();
      },
    };

    me.addButtonOptions = {
      icon: 'plus',
      text: 'Yeni Ürün Ekle',
      onClick: () => {
        me.productCreateAndUpdateComponent.show(new ProductsDTO());
      },
    };
  }
}
