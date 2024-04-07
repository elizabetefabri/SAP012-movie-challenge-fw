import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOptionsComponent } from './list-options.component';
import { FormsModule } from '@angular/forms';

describe('ListOptionsComponent', () => {
  let component: ListOptionsComponent;
  let fixture: ComponentFixture<ListOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ListOptionsComponent]
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
    const testOption = { value: 'testValue', label: 'Test Label' };
    component.options = [JSON.stringify(testOption)]; // Convertido para uma string JSON
    component.selectedOption = testOption.value; // Definido o valor selecionado
    component.selectOption(); // Chamada sem parâmetros, pois o valor já está definido
    expect(component.onChange.emit).toHaveBeenCalledWith(testOption.value);
  });

  it('deve emitir onClear quando a seleção for desmarcada', () => {
    spyOn(component.onClear, 'emit');
    component.clearSelections();
    expect(component.onClear.emit).toHaveBeenCalled();
  });
});
