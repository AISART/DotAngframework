import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Photo} from '../../../../models/photo';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../services/auth.service';
import {UserService} from '../../../../services/user.service';
import {AlertifyService} from '../../../../services/alertify.service';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html'
})
export class PhotoEditorComponent implements OnInit, OnChanges {
    @Input() photos: Photo[];
    @Output() getMemberPhotoChange = new EventEmitter<string>();

    uploader: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;
    currentMain: Photo;

    constructor(private authService: AuthService,
                private userService: UserService,
                private alertify: AlertifyService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const inputs = document.querySelectorAll( '.btn-uploader' );
        Array.prototype.forEach.call( inputs, function( input ) {
            const label	 = input.nextElementSibling, labelVal = label.innerHTML;

            input.addEventListener('change', function(e) {
                let fileName = '';
                console.log('wat zit hierin dan', e);
                console.log('this.files', this.files);
                if (this.files && this.files.length > 1) {
                    console.log('yo');
                    fileName = (this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
                    console.log('laat je deze zien?', fileName);
                } else {
                    fileName = e.target.value.split(/(?:\\)/).pop();
                }

                if (fileName) {
                    console.log('filename', fileName);
                    console.log('queryselector', label.querySelector('span'));
                    label.querySelector('span').innerHTML = fileName;
                } else {
                    label.innerHTML = labelVal;
                }
            });
        });
    }

    ngOnInit() {
        this.initializeUploader();
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    initializeUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
            authToken: 'Bearer ' + localStorage.getItem('token'),
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };

        this.uploader.onSuccessItem = (item, response, status, headers) => {
            if (response) {
                const res: Photo = JSON.parse(response);
                const photo = {
                    id: res.id,
                    url: res.url,
                    dateAdded: res.dateAdded,
                    description: res.description,
                    isMain: res.isMain,
                    isApproved: res.isApproved
                };
                this.photos.push(photo);

                if (photo.isMain) {
                    this.authService.changeMemberPhoto(photo.url);
                    this.authService.currentUser.photoUrl = photo.url;
                    localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
                }
            }
        };
    }

    setMainPhoto(photo: Photo) {
        this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
            this.currentMain = this.photos.filter(p => p.isMain === true)[0];

            this.currentMain.isMain = false;
            photo.isMain = true;

            this.getMemberPhotoChange.emit(photo.url);
            this.authService.changeMemberPhoto(photo.url);

            this.authService.currentUser.photoUrl = photo.url;
            localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

            this.alertify.success('New main photo!');
        }, error => {
            this.alertify.error(error);
        });
    }

    deletePhoto(id: number) {
        this.alertify.confirm('Are you sure you want to delete this photo?', () => {
            this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
                this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
                this.alertify.success('This photo has been deleted');
            }, error => {
                this.alertify.error(error);
            });
        });
    }
}
