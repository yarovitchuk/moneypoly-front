export enum Character {
    DOG = 'DOG',
    CAR = 'CAR',
    SHIP = 'SHIP',
    GOOSE = 'GOOSE',
    DINO = 'DINO',
    HAT = 'HAT',
}

export const characterMap: Record<Character, string | null> = {
    [Character.DOG]: require('../assets/png/dog.png'),
    [Character.CAR]: require('../assets/png/car.png'),
    [Character.SHIP]: require('../assets/png/ship.png'),
    [Character.GOOSE]: require('../assets/png/goose.png'),
    [Character.DINO]: require('../assets/png/dino.png'),
    [Character.HAT]: require('../assets/png/hat.png'),
};
