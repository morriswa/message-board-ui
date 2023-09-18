import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadAndCropComponent } from './image-upload-and-crop.component';

describe('ImageUploadAndCropComponent', () => {
  let component: ImageUploadAndCropComponent;
  let fixture: ComponentFixture<ImageUploadAndCropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploadAndCropComponent]
    });
    fixture = TestBed.createComponent(ImageUploadAndCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
