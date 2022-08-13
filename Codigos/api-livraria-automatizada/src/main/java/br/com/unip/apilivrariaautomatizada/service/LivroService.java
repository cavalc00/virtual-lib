package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.models.dto.LivroDTO;
import br.com.unip.apilivrariaautomatizada.models.response.LivroResponse;
import br.com.unip.apilivrariaautomatizada.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository repository;

    public void criarLivro(LivroDTO request) {
        //TODO
    }

    public void atualizarLivro(Long id, LivroDTO request) {
        //TODO
    }

    public void deletarLivro(Long id) {
        //TODO
    }

    public LivroResponse mostrarLivro(Long id) {
        //TODO
        return null;
    }

    public List<LivroResponse> mostrarTodosLivros() {
        //TODO
        return null;
    }
}
