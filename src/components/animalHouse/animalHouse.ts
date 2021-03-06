import {Animal} from './animals.ts';

export class AnimalHouse {
    private animals: Animal[] = [];
    private newAnimal: any;
    private $log: any;
    private errorMessage: string;
    private animalService: any;
    constructor($log, animalService) {
        this.$log = $log;
        this.animalService = animalService;
        this.$log.log('initialized');
        this.newAnimal = {};
        this.newAnimal.name = "";
        this.newAnimal.species = "";
        this.getAnimals();
    }
    getAnimals() {
        let newAnimals = [];
        this.animalService.getAnimals().then((existingAnimals) => {
            for (let animal of existingAnimals)
                newAnimals.push(new Animal(animal.name, animal.species, animal.history));
        }).then(() => {
            //with the animals that are pulled, will add any pizzas previously eaten.
            for (let animal of newAnimals)
                for (let incident of animal.history)
                        animal.atePizza();
        });
        this.$log.log('animals loaded');
        //puts the finalized animals collection on display
        this.animals = newAnimals;
    }
    addAnimal() {
        try {
            this.errorMessage = "";
            if (this.newAnimal.name.length === 0 || this.newAnimal.name.trim() === "" || this.newAnimal.species.length === 0 || this.newAnimal.species.trim() == "")
                //checks that newAnimal is not blank and contains characters other than whitespace
                throw 'The new animal\'s name and species cannot be blank.';
            if (this.newAnimal.name === null || this.newAnimal.species === null)
                //no nulls allowed
                throw 'The new animal is null.';
            if (this.animalExists(this.newAnimal))
                //must be a unique animal
                throw 'That animal already exists.';
            //adds animal to display
            this.animals.push(new Animal(this.newAnimal.name, this.newAnimal.species, []));
            //sends animal to service to kick to DB
            this.animalService.addAnimal(this.newAnimal);
            this.$log.log('New animal pushed. ' + this.animals[this.animals.length - 1].name);
            this.newAnimal = "";
        }
        catch (err) {
            this.$log.log('Error logged: ' + err);
            this.errorMessage = "Error: " + err;
        }
    }
    animalExists(newAnimal) {
        for (let animal of this.animals) {
        if (newAnimal.name === animal.name && newAnimal.species === animal.species)
            return true;
    }
        return false;
    }
pizzaEaten(eatingAnimal) {
    this.animalService.pizzaEaten(eatingAnimal);
    eatingAnimal.atePizza();
    let d = new Date();
    eatingAnimal.history.push({ year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() });
}
}
AnimalHouse.$inject = ['$log', 'animalService']