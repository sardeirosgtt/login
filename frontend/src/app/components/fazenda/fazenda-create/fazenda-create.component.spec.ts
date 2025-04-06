import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazendaCreateComponent } from './fazenda-create.component';

describe('FazendaCreateComponent', () => {
  let component: FazendaCreateComponent;
  let fixture: ComponentFixture<FazendaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazendaCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FazendaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
