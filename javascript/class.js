{
  class Vehicle {
    ignition() {
      console.log("Turning on my engine");
    }
    drive() {
      this.ignition();
      console.log("Steering and moving forward!");
    }
  }

  class Car extends Vehicle {
    ignition() {
      console.log("Turn on the engine");
    }

    drive() {
      super.drive();
      console.log("Rolling on all wheels");
    }
  }

  const car = new Car();
  car.drive(); // ?
}
