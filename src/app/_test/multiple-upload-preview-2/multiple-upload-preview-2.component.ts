import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-multiple-upload-preview-2',
    templateUrl: './multiple-upload-preview-2.component.html',
    styleUrls: ['./multiple-upload-preview-2.component.css'],
})
export class MultipleUploadPreview2Component implements OnInit {
    // https://www.itsolutionstuff.com/post/angular-8-multiple-image-upload-with-previewexample.html
    images = [];
    myForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
        ]),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required]),
    });

    constructor(private http: HttpClient) {}

    get f() {
        return this.myForm.controls;
    }

    ngOnInit() {}

    removeImage(index: number) {
        let indexToRemove = confirm('remove image? ' + index);
        console.log(this.images);
    }

    onFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event: any) => {
                    // console.log(event.target.result);
                    this.images.push(event.target.result);

                    this.myForm.patchValue({
                        fileSource: this.images,
                    });
                };

                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    submit() {
        console.log(this.myForm.value);
        this.http
            .post('http://localhost:8001/upload.php', this.myForm.value)
            .subscribe((res) => {
                console.log(res);
                alert('Uploaded Successfully.');
            });
    }
}
