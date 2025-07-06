import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Genre } from 'src/models/Genre';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css'],
})
export class ListOptionsComponent implements OnInit, OnDestroy {
  @Input() options: string[] = [];
  @Input() selectedOption: string = '0';
  @Input() isSorting: boolean = true;
  optionsObj: Genre[] = [];
  @Input() optionTitle: string = '--Por favor escolha uma opção--';

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  private clearSubscription: Subscription = new Subscription();
  @Input() onClear: Observable<string> = new Observable<string>();

  constructor() {}
  ngOnDestroy(): void {
    this.clearSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.optionsObj = this.options.map((option) => JSON.parse(option));
    console.log(this.selectedOption);
    this.clearSubscription = this.onClear.subscribe((option) => {
      this.selectedOption = option;
    });
  }

  selectOption(): void {
    this.onChange.emit(this.selectedOption);
  }
}
