package br.com.unip.apilivrariaautomatizada.repository;

import br.com.unip.apilivrariaautomatizada.model.entity.LocacaoLivro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocacaoLivroRepository extends JpaRepository<LocacaoLivro, Long> {

    @Query(value = "SELECT ll FROM LocacaoLivro ll WHERE ll.livro.id = ?1 AND ll.dataDevolvido IS NULL ORDER BY ll.id ASC")
    List<LocacaoLivro> findByIdLivro(Long livroId);
}
