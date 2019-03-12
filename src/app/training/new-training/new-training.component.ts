import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;
  // Le classi iniettate tramite DI le inserisco qui nel costruttore
  // NB che per poterle usare, il motore di DI deve anche avere specificato il tipo di classe
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    //this.exercises = this.trainingService.getAvailableExercises();
    this.exercises = this.db
      .collection('availableExercises')
      .valueChanges();
  }

  onStartTraining(form: NgForm) {
    console.log('onStartTraining()');
    this.trainingService.startExercise(form.value.exercise);
  }

}
