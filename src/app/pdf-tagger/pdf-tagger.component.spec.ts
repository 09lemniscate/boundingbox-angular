import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTaggerComponent } from './pdf-tagger.component';

describe('PdfTaggerComponent', () => {
  let component: PdfTaggerComponent;
  let fixture: ComponentFixture<PdfTaggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTaggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
