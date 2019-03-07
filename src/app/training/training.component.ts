import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChange.subscribe(
      exercise => {
        console.log('exercise', exercise);
        if (exercise) {
          console.log('true');
          this.onGoingTraining = true;
        } else {
          console.log('true');
          this.onGoingTraining = false;
        }
      }
    );
  }

}
