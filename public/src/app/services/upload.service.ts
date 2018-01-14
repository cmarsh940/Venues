import { Injectable } from '@angular/core';
import { Upload } from '../models/upload';

@Injectable()
export class UploadService {
  constructor() {}

  pushUpload(upload: Upload) {
    console.log("*** YOU NEED TO WRITE THE FUNCTION IN UPLOAD SERVICE")
    // let storageRef = this.storage().ref();
    // let uploadTask = storageRef
    //   .child(`uploads/${upload.file.name}`)
    //   .put(upload.file);
    // uploadTask.on(
    //   firebase.storage.TaskEvent.STATE_CHANGED,
    //   snapshot => {
    //     upload in progress
    //     upload.progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    //   },
    //   error => {
    //     upload failed
    //     console.log(error);
    //   },
    //   () => {
    //     upload success
    //     upload.url = uploadTask.snapshot.downloadURL;
    //     upload.name = upload.file.name;
    //     this.saveFileData(upload);
    //   }
    // );
  }
}
