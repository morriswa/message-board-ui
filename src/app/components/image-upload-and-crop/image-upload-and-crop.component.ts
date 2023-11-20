import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {Utils} from "../../Utils";
import {FormControl} from "@angular/forms";
import {UploadImageRequest} from "../../interface/upload-image-request";
import heic2any from "heic2any";



@Component({
  selector: 'app-image-upload-and-crop',
  templateUrl: './image-upload-and-crop.component.html',
  styleUrls: ['./image-upload-and-crop.component.scss']
})
export class ImageUploadAndCropComponent implements OnInit{
  croppingInProgress= false;

  fileInput = new FormControl();

  stagedProfilePhotoForUpload?:Blob;

  imageChangedEvent?: any;

  @Input() resetImageComponent: EventEmitter<any> = new EventEmitter<any>();
  @Input() ASPECT_RATIO: number = 1;
  @Input() MAINTAIN_ASPECT_RATIO: boolean = false;
  @Output() imageCroppedAndReadyEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() userDialog?: string;

  ngOnInit(): void {
    this.resetImageComponent.subscribe(()=>this.reset())
  }

  public reset() {
    this.fileInput.reset();
    this.stagedProfilePhotoForUpload = undefined;
    this.croppingInProgress = false;
    this.imageChangedEvent = undefined;
  }

  public newImageUploaded($event: any) {
    this.stagedProfilePhotoForUpload = undefined;

    // extract file object from event
    let file:File = $event.target.files[0];

    switch (file.type) {
      case "image/gif":
        this.stagedProfilePhotoForUpload = file;
        this.confirmCropAndReturnImageObj();
        return;
      case "image/heic":
        file.arrayBuffer()
          // retrieve array buffer of file
          .then((arrayBuffer:ArrayBuffer) =>
            // and convert to Blob of correct type
            new Blob([new Uint8Array(arrayBuffer)], {type: file.type })
          ).then((blob:Blob) =>
            // convert retrieved HEIC blob to JPEG blob
            heic2any({
              blob,
              toType: "image/jpeg",
              quality: 0.5
            }))
          .then((conversionResult) =>
            // grab array buffer of converted object
            (conversionResult as Blob).arrayBuffer()
          )
          .then((conversionResult:any) => {
            // use array buffer to construct new image uploaded event, and assign to image changed event
            this.imageChangedEvent = {
              target: {
                files: [
                  new File([conversionResult], 'dont-use-this-value', {type:"image/jpeg"})
                ]
              }
            };
          })
          .catch((e:any) => {
            // catch any errors
            console.error(e)
          });
        break;
      default:
        this.imageChangedEvent = $event;
        break;
    }

    this.croppingInProgress = true;
  }

  public imageCropped($event: ImageCroppedEvent) {
    this.stagedProfilePhotoForUpload = $event.blob!;
  }

  public confirmCropAndReturnImageObj() {

    if (this.stagedProfilePhotoForUpload) {
      this.croppingInProgress = false;
      this.imageChangedEvent = undefined;
      this.imageCroppedAndReadyEvent.emit(this.stagedProfilePhotoForUpload)
    }
  }

}
