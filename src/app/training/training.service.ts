// Deve gestire gli esercizi che facciamo, quelli già fatti ecc...
import { Exercise } from './exercise.model';

export class TrainingService {
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];

    getAvailableExercises(){
        return this.availableExercises.slice();
        // slice() crea una copia dell'array, non restituisce la referenza ll'oggetto
    }
}