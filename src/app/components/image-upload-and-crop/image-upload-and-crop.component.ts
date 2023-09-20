import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {Utils} from "../../Utils";
import {FormControl} from "@angular/forms";
import {UploadImageRequest} from "../../interface/upload-image-request";


@Component({
  selector: 'app-image-upload-and-crop',
  templateUrl: './image-upload-and-crop.component.html',
  styleUrls: ['./image-upload-and-crop.component.scss']
})
export class ImageUploadAndCropComponent implements OnInit{
  loading = true
  croppingInProgress= false;

  fileInput = new FormControl();

  fileUpload?: File;
  stagedProfilePhotoForUpload?:Blob;

  imageChangedEvent: any;

  @Input() resetImageComponent: EventEmitter<any> = new EventEmitter<any>();
  @Input() ASPECT_RATIO: number = 1;
  @Input() MAINTAIN_ASPECT_RATIO: boolean = false;
  @Output() imageCroppedAndReadyEvent: EventEmitter<UploadImageRequest> = new EventEmitter<UploadImageRequest>();

  ngOnInit(): void {
    this.resetImageComponent.subscribe(()=>this.reset())
  }

  public reset() {
    this.fileInput.reset();
    this.fileUpload = undefined;
    this.stagedProfilePhotoForUpload = undefined;
    this.croppingInProgress = false;
    this.imageChangedEvent = undefined;
  }

  public newImageUploaded($event: any) {
    this.fileUpload = $event.target.files[0];
    this.imageChangedEvent = $event;
    this.croppingInProgress = true;
  }

  public imageCropped($event: ImageCroppedEvent) {
    this.stagedProfilePhotoForUpload = $event.blob!;
  }

  public confirmCropAndReturnImageObj() {
    // this.PROCESSING_REQUEST = true;

    if (this.stagedProfilePhotoForUpload) {

      this.croppingInProgress = false;
      Utils.file2Base64(this.stagedProfilePhotoForUpload).then(b64Repr => {
        let concatb64Repr = b64Repr.slice(b64Repr.indexOf(",") + 1)
        let imageFormat = b64Repr.slice(b64Repr.indexOf("/") + 1, b64Repr.indexOf(";"))

        this.imageCroppedAndReadyEvent.emit({baseEncodedImage: concatb64Repr,imageFormat: imageFormat});
      });
    }
  }


}
