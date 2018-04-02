import { Component } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector: 'app-root',
    templateUrl: './manager-file.component.html',
    styleUrls: ['./manager-file.component.css']
})
export class ManagerFileComponent {
    title = 'manager file';
    selectedFiles: FileList;
    file: File;
    imgsrc;
    color: string = 'primary';
    mode: 'determinate';
    progressBarValue;

    constructor(private storage: AngularFireStorage) {

    }

    chooseFiles(event) {
        this.selectedFiles = event.target.files;
        if (this.selectedFiles.item(0)) {
            this.uploadpic();
        }
    }

    uploadpic() {
        let file = this.selectedFiles.item(0);
        let uniqkey = 'pic' + Math.floor(Math.random() * 1000000);
        const uploadTask = this.storage.upload('/images/' + uniqkey, file);

        this.imgsrc = uploadTask.downloadURL();

        uploadTask.percentageChanges().subscribe((value) => {
            this.progressBarValue = value.toFixed(2);
        });
    }
}
