// Deve gestire gli esercizi che facciamo, quelli già fatti ecc...
import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
    exerciseChange = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();

    private availableExercises: Exercise[] = [];
    private runningExercise: Exercise;
    private exercises: Exercise[] = [];

    constructor(private db: AngularFirestore) { }

    fetchAvailableExercises() {
        this.db
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
                    } as Exercise;  // trovata soluzione in Q&A
                });
            }))
            .subscribe((exercises: Exercise[]) => {
                this.availableExercises = exercises;
                this.exercisesChanged.next([...this.availableExercises]);
            });
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(
            ex => ex.name === selectedId
        );
        this.exerciseChange.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChange.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    getCompletedORCancelledExercises() {
        return this.exercises.slice();
    }
}