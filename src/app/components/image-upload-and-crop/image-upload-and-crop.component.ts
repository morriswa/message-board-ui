import {Component, EventEmitter, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {Utils} from "../Utils";
import {Observable, of} from "rxjs";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-image-upload-and-crop',
  templateUrl: './image-upload-and-crop.component.html',
  styleUrls: ['./image-upload-and-crop.component.scss']
})
export class ImageUploadAndCropComponent {
  loading = true
  croppingInProgress= false;

  fileUpload?: File;
  stagedProfilePhotoForUpload?:Blob;

  fileInput = new FormControl();
  imageChangedEvent: any;

  @Output() imageCroppedAndReadyEvent: EventEmitter<any> = new EventEmitter<any>();


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
