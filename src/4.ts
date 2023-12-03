interface IKey {
  getSignature(): number;
}

interface IPerson {
  getKey(): Key;
}
class Key implements IKey {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

class Person implements IPerson {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}
abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];

  constructor(protected key: Key) {}

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key) {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
