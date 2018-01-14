import { Component, OnInit } from '@angular/core';
import { Upload } from '../../../models/upload';
import { UploadService } from '../../../services/upload.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  currentUpload: Upload;
  dropzoneActive: boolean;


  constructor(private upSvc: UploadService) {}
  dropzoneState($event: boolean) {
    this.dropzoneActive = $event;
  }
  ngOnInit(dropzoneActive = false): void {}

  handleDrop(fileList: FileList) {
    const filesIndex = _.range(fileList.length);
    _.each(filesIndex, idx => {
      this.currentUpload = new Upload(fileList[idx]);
      this.upSvc.pushUpload(this.currentUpload);
    });
  }
}
