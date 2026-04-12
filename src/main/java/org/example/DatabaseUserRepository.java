package org.example;

import org.springframework.data.repository.CrudRepository;

public interface DatabaseUserRepository extends CrudRepository<DatabaseUser, Long> {
}
