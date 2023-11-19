import { Component ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangugeService } from '../../services/languge.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title!:string
  @Input() text!:string
  @Input() tags!:string[]
  @Input() image!:string
  @Input() LastModification!:string
  @Input() creationDate!:string
  constructor(public languge:LangugeService){}

}
