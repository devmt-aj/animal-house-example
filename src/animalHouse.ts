import {Animal} from './animals.ts'

export class AnimalHouse {
    private animals: Animal[] = [];
    private animalList: string[] = ['Zebra', 'Giraffe', 'Alligator', 'T-Rex', 'Dodo'];
    private newAnimal: string = "";
    private $log: any;
    private errorMessage: string;
    constructor($log) {
        this.$log = $log;
        this.$log.log('initialized');
        for (let i = 0; i < this.animalList.length; i++) {
            this.animals.push(new Animal(this.animalList[i]));
            this.$log.log('New animal pushed. ' + this.animals[i].name);
        }
    }
    addAnimal() {
        try {
            this.errorMessage = "";
            if (this.newAnimal.length === 0 || this.newAnimal.trim()==="")
                //checks that newAnimal is not blank and contains characters other than whitespace
                throw 'The new animal\'s name cannot be blank.';
            if (this.newAnimal === null)
                throw 'The new animal is null.';
            this.animals.push(new Animal(this.newAnimal));
            this.$log.log('New animal pushed. ' + this.animals[this.animals.length - 1].name);
        }
        catch (err) {
            this.$log.log('Error logged: ' + err);
            this.errorMessage = "Error: " + err;
        }
    }
}
AnimalHouse.$inject = ['$log']