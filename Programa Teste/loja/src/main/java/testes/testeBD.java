package testes;

import model.Categoria;
import model.Produto;

import java.math.BigDecimal;

import static config.GenerateEntityManager.*;

public class testeBD {

    public static void main(String[] args) {
        Categoria categoria = new Categoria("CELULARES");

        Produto produto = new Produto("Celular",
                "celular velho",
                new BigDecimal("800.00"), categoria);


        entityManager.getTransaction();
        entityManager.getTransaction().begin();

        entityManager.persist(categoria);
        entityManager.persist(produto);

        entityManager.getTransaction().commit();

        var find = entityManager.find(Produto.class, produto.getId());
        entityManager.close();
        entityManagerFactory.close();

        System.out.println(find);

    }

}
