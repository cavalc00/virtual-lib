package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.models.dto.LivroDTO;
import br.com.unip.apilivrariaautomatizada.models.entities.Livro;
import br.com.unip.apilivrariaautomatizada.models.response.LivroResponse;
import br.com.unip.apilivrariaautomatizada.repository.GeneroLivroRepository;
import br.com.unip.apilivrariaautomatizada.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livroRepository;
    private final GeneroLivroRepository generoLivroRepository;

    public void criarLivro(LivroDTO request) {
        try {

            Livro livro = Livro.builder()
                    .titulo(request.getTitulo())
                    //.generoLivro()
                    //.resumoLivro()
                    .autor(request.getAutor())
                    .anoLancamento(request.getAnoLancamento())
                    .editora(request.getEditora())
                    .build();

            livroRepository.save(livro);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            //TODO substituir por uma exception do projeto
        }
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
