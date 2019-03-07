import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] = [];
  // Le classi iniettate tramite DI le inserisco qui nel costruttore
  // NB che per poterle usare, il motore di DI deve anche avere specificato il tipo di classe
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining(){
    this.trainingStart.emit();
  }

}
