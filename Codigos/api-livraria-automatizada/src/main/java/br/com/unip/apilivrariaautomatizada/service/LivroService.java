package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.models.entities.Livro;
import br.com.unip.apilivrariaautomatizada.models.request.LivroCreateRequest;
import br.com.unip.apilivrariaautomatizada.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository repository;

    public void createBook(LivroCreateRequest request) {
        Livro livro = Livro.builder()
                .titulo(request.getTitle())
                .autor(request.getAutor())
                .anoLancamento(request.getYear())
                .editora(request.getEditor())
                .build();

        repository.save(livro);
    }
}
