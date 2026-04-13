package org.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarDatabaseDemoApplication {

    private final CarRepository carRepository;

    private final OwnerRepository ownerRepository;

    private final DatabaseUserRepository databaseUserRepository;

    public CarDatabaseDemoApplication(CarRepository carRepository, OwnerRepository ownerRepository, DatabaseUserRepository databaseUserRepository) {
        this.carRepository = carRepository;
        this.ownerRepository = ownerRepository;
        this.databaseUserRepository = databaseUserRepository;
    }

    public static void main(String[] args) {
        SpringApplication.run(CarDatabaseDemoApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner car(CarRepository repository) {
//        return (args) -> {
//            // save a few customers
//            repository.save(new Car("Ford", "Capri", "red", "12345", 2020, 12340));
//        };
//    }
//
//    @Bean
//    public CommandLineRunner owner(OwnerRepository repository) {
//        return (args) -> {
//            // save a few customers
//            repository.save(new Owner("John", "Smith"));
//        };
//    }

//    @Bean
//    public CommandLineRunner demo() {
//        return (args) -> {
//            // save a few customers
//            Owner owner1 = new Owner("John", "Smith");
//            ownerRepository.save(owner1);
//            carRepository.save(new Car("Ford", "Capri", "red", "12345", 2020, 12340, owner1));
//        };
//    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
            Owner owner1 = new Owner("John" , "Johnson");
            Owner owner2 = new Owner("Mary" , "Robinson");
            ownerRepository.save(owner1);
            ownerRepository.save(owner2);

            carRepository.save(new Car("Ford", "Mustang", "Red", "ADF-1121", 2017, 59000, owner1));
            carRepository.save(new Car("Nissan", "Leaf", "White", "SSJ-3002", 2014, 29000, owner2));
            carRepository.save(new Car("Toyota", "Prius", "Silver", "KKO-0212", 2018, 39000, owner2));

            databaseUserRepository.save(new DatabaseUser("user", "$2a$04$1.YhMIgNX/8TkCKGFUONWO1waedKhQ5KrnB30fl0Q01QKqmzLf.Zi", "USER"));
            databaseUserRepository.save(new DatabaseUser("admin", "$2a$04$KNLUwOWHVQZVpXyMBNc7JOzbLiBjb9Tk9bP7KNcPI12ICuvzXQQKG", "ADMIN"));
        };
    }
}
