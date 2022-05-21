package config;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class GenerateEntityManager {
    public static final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("loja");
    public static EntityManager entityManager = entityManagerFactory.createEntityManager();
}
