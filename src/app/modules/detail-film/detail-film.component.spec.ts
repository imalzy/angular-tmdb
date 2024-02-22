import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFilmComponent } from './detail-film.component';

describe('DetailFilmComponent', () => {
  let component: DetailFilmComponent;
  let fixture: ComponentFixture<DetailFilmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DetailFilmComponent]
    });
    fixture = TestBed.createComponent(DetailFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
