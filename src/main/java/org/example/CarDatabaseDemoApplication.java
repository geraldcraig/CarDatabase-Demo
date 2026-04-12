package org.example;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarDatabaseDemoApplication {

    private final CarRepository carRepository;

    private final OwnerRepository ownerRepository;

    public CarDatabaseDemoApplication(CarRepository carRepository, OwnerRepository ownerRepository) {
        this.carRepository = carRepository;
        this.ownerRepository = ownerRepository;
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

    @Bean
    public CommandLineRunner demo() {
        return (args) -> {
            // save a few customers
            Owner owner1 = new Owner("John", "Smith");
            ownerRepository.save(owner1);
            carRepository.save(new Car("Ford", "Capri", "red", "12345", 2020, 12340, owner1));
        };
    }
}
