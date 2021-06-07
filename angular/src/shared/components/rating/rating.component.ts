import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() fixed: boolean = false;
  @Input() initValue: number = 0.0;
  @Input() msg = "Bạn thực sự muốn đánh giá đối tượng này [STAR_RATE] sao?";

  @Output() onRatingChange = new EventEmitter();

  @ViewChild("dataRating") dataRating: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  onChangeRating(index) {
    if (!this.fixed) {
      abp.message.confirm(
        this.msg.replace("[STAR_RATE]", index),
        "ĐÁNH GIÁ SAO",
        (result: boolean) => {
          if (result) {
            this.initValue = index;
            this.onRatingChange?.emit(index);
          }
        },
      );
    }
  }

}
