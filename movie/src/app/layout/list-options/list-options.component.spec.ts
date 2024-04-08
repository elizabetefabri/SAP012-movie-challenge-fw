import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOptionsComponent } from './list-options.component';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

describe('ListOptionsComponent', () => {
  let component: ListOptionsComponent;
  let fixture: ComponentFixture<ListOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ListOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir onChange quando uma opção é selecionada', () => {
    spyOn(component.onChange, 'emit');
    const testOption = 'testValue';
    component.options = [testOption];
    component.selectedOption = testOption;
    component.selectOption();
    expect(component.onChange.emit).toHaveBeenCalledWith(testOption);
  });

  it('deve emitir onClear quando a seleção for desmarcada', () => {
    spyOn(component.onClear, 'subscribe').and.callThrough();
    const clearSubject = new Subject<string>();
    component.onClear = clearSubject.asObservable();
    component.ngOnInit();

    const testOption = '0';
    clearSubject.next(testOption);

    expect(component.selectedOption).toBe(testOption);
  });
});
