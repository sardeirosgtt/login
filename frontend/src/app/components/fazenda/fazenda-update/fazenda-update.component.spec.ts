import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazendaUpdateComponent } from './fazenda-update.component';

describe('FazendaUpdateComponent', () => {
  let component: FazendaUpdateComponent;
  let fixture: ComponentFixture<FazendaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazendaUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FazendaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
