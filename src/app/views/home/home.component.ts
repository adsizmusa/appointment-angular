import { Component, OnInit } from '@angular/core';
import { MenuEnum } from 'src/app/core/enums/menu.enum';
import { SpUserMenus } from 'src/app/core/models/sp.user.menus';
import { SlideService } from 'src/app/core/services/slide.service';
import { BaseControl } from '../base.control';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends BaseControl implements OnInit {
  pageRights: SpUserMenus = new SpUserMenus();
  constructor(private slideService: SlideService) {
    super();
    const me = this;
    me.slideService.getNavigationList();
  }

  ngOnInit(): void {
    const me = this;
    me.pageRights = me.slideService.getPageRights(MenuEnum.Home);
  }
}
