import { AfterViewInit, Directive } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TabMenu } from 'primeng/tabmenu';

/**
 * Temporary workaround for bugs with `TabMenu` active item.
 *
 * @see https://github.com/primefaces/primeng/issues/9306
 */

@Directive({
  selector: '[activeItemWorkaround]',
})
export class ActiveItemWorkaroundDirective implements AfterViewInit {
  constructor(private readonly menu: TabMenu, private readonly router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.runFix();
      }
    })
  }

  public ngAfterViewInit(): void {
    this.runFix();
  }

  private runFix() {
    this.fixActiveItemWithRouterLink();
    this.fixActiveItemWithoutRouterLink();
  }
  /**
   * Problem: Items with `routerLink` are not correctly activated.
   * Solution: Manually set `TabMenu.activeItem`
   */
  private fixActiveItemWithRouterLink(): void {
    const url = this.router.routerState.snapshot.url;
    const activeItem = this.menu.model.find(tab => url.startsWith(tab.routerLink));
    if (activeItem) {
      this.menu.activeItem = activeItem;
    }
  }

  /**
   * Problem: Items without `routerLink` are activated, but not correctly highlighted.
   * Solution: Manually add/remove the `p-highlight` class to `.p-tabmenuitem`
   */
  private fixActiveItemWithoutRouterLink(): void {
    if (!(this.menu.activeItem && this.menu.activeItem.id !== undefined)) return;

    const activeIndex = this.menu.model.findIndex(tab => tab.id === this.menu.activeItem.id);
    const list = this.menu.navbar.nativeElement as HTMLUListElement;
    const item = list.children[activeIndex];

    if (!item) {
      return;
    }

    // Add class
    item.classList.add('p-highlight');

    // Remove class on first change
    list.addEventListener(
      'click',
      function (event: Event) {
        const targetItem = (event.target as HTMLElement).closest('.p-tabmenuitem');

        if (targetItem !== item) {
          item.classList.remove('p-highlight');
        }
      },
      { once: true }
    );
  }
}