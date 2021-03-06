import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PagerComponent implements OnInit {
  @Input()
  totalCount!: number;
  @Input()
  pageSize!: number;
  @Input()
  pageNumber!: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }

}
