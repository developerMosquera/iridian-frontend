import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from "@angular/forms";
import { ContactService } from '../../services/contact.service';
import { IContactArea } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title = 'Contact';
  contactForm: FormGroup;
  contactAreas!: Array<IContactArea>;
  messageContact: string;

  constructor(private formBuilder: FormBuilder, private readonly contactService: ContactService) {
    this.contactForm = this.formBuilder.group({
      nombre: new FormControl(null, Validators.compose([Validators.required])),
      apellido: new FormControl(null, Validators.compose([Validators.required])),
      correo: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      celular: new FormControl(null, Validators.compose([Validators.required])),
      contact_area_id: new FormControl(null, Validators.compose([Validators.required])),
      mensaje: new FormControl(null, Validators.compose([Validators.required])),
    });

    this.messageContact = '';
  }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas() {
    this.contactAreas = [];
    this.contactService.getAreas().subscribe({
      next: (data) => {
        this.contactAreas = data;
      },
      complete: () => {
        console.log(this.contactAreas);
      }
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      this.contactService.postContact(this.contactForm.value).subscribe({
        next: (data) => {
          this.messageContact = data.message;
        },
        complete: () => {
          this.contactForm.reset();
        }
      });
    }
  }
}
