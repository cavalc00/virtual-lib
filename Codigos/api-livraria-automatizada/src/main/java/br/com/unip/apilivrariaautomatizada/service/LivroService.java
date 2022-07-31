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

    public void criarLivro(LivroCreateRequest request) {

        //TODO

    }
}
