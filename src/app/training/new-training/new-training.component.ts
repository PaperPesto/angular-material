import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;
  // Le classi iniettate tramite DI le inserisco qui nel costruttore
  // NB che per poterle usare, il motore di DI deve anche avere specificato il tipo di classe
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }

  ngOnInit() {
    //this.exercises = this.trainingService.getAvailableExercises();

    // pipe() si usa perché stiamo usando rxjs > 6
    this .exercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            // name: doc.payload.doc.data().name,
            // duration: doc.payload.doc.data().duration,
            // calories: doc.payload.doc.data().calories
            ...doc.payload.doc.data()
          } as Exercise;
        });
      }));
      // .subscribe(result => {
      //   console.log(result);
      // })
  }

  onStartTraining(form: NgForm) {
    console.log('onStartTraining()');
    this.trainingService.startExercise(form.value.exercise);
  }

}
