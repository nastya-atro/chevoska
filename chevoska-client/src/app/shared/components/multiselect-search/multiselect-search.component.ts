import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

export type MultiselectParams = {
  selectedOptions: any[];
};

@Component({
  selector: 'app-multiselect-search',
  templateUrl: './multiselect-search.component.html',
  styleUrls: ['./multiselect-search.component.scss'],
})
export class MultiselectSearchComponent implements OnInit {
  @Input() title!: string;
  @Input() entity!: string;
  @Input() options: any[] = [];
  @Input() selectedOptions: any[] = [];
  @Output() handleChange = new EventEmitter<MultiselectParams>();
  @Output() handleSearchQ = new EventEmitter<string>();
  @Output() handlePagination = new EventEmitter<string>();
  selected!: any[];
  $el: HTMLElement | null = null;
  displayedColumns = ['id', 'first name', 'last name', 'email'];

  ngOnInit() {
    if (this.selectedOptions) {
      this.selected = [...this.selectedOptions];
    }
  }

  infiniteContentScroll() {
    this.handlePagination.emit();
  }

  handleSearch(event: any) {
    this.handleSearchQ.emit(event.target.value);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(evt: any) {
    if (
      (evt.path && !evt.path.includes(this.$el) && this.$el) ||
      (evt.composedPath && !evt.composedPath().includes(this.$el) && this.$el)
    ) {
      this.$el.classList.remove('multiselect_opened');
      this.$el = null;
    }
  }

  addSelectItem($event: any, item: any) {
    $event.preventDefault();
    $event.stopPropagation();

    this.selected.push(item);
    this.$el && this.$el.classList.remove('multiselect_opened');

    this.handleChange.emit({ selectedOptions: this.selected });
  }

  removeSelectItem($event: any, item: any) {
    $event.preventDefault();
    $event.stopPropagation();

    this.selected = this.selected.filter(option => option.id !== item.id);
    this.handleChange.emit({ selectedOptions: this.selected });
  }

  toggleMultiselect($el: HTMLElement) {
    this.$el = $el;
    this.$el.classList.toggle('multiselect_opened');
  }
}
