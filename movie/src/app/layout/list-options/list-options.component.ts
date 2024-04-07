import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Genre } from 'src/models/Genre';

@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent implements OnChanges, DoCheck {
  @Input() options: string[] = [];
  @Input() selectedOption: string = "0";
  @Input() isSorting: boolean = true;
  optionsObj: Genre[] = [];
  @Input() optionTitle:string = "--Por favor escolha uma opção--";

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClear: EventEmitter<void> = new EventEmitter();

  constructor() { }
  ngDoCheck(): void {
    if(this.onClear){
      this.selectedOption = "0"
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.optionsObj = this.options.map(option => JSON.parse(option));
    // this.selectedOptionStr = JSON.stringify(this.selectedOption)
    // console.log(changes['selectedOption'].currentValue)
  }

  clearSelections(): void {
    // Limpa a seleção do componente
    this.selectedOption = "0";
    this.onClear.emit();
  }
  selectOption(): void {
    this.onChange.emit(this.selectedOption);
  }

}
