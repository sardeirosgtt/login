import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazendaReadComponent } from './fazenda-read.component';

describe('FazendaReadComponent', () => {
  let component: FazendaReadComponent;
  let fixture: ComponentFixture<FazendaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FazendaReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FazendaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
