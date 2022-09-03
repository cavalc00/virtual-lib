package br.com.unip.apilivrariaautomatizada.repository.spec;

import br.com.unip.apilivrariaautomatizada.model.entity.Livro;
import br.com.unip.apilivrariaautomatizada.model.enums.GeneroEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;

@RequiredArgsConstructor
public class LivroSpecification implements Specification<Livro> {

    private final Long idGeneroLivro;

    @Override
    public Predicate toPredicate(Root<Livro> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        var predicates = new ArrayList<Predicate>();

        if (idGeneroLivro != null && !(idGeneroLivro.equals(GeneroEnum.TODOS.getId()))) {
            predicates.add(criteriaBuilder.equal(root.get("generoLivro").get("id"), idGeneroLivro));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
