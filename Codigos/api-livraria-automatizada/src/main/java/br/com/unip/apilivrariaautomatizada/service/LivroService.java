package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.mapper.LivroMapper;
import br.com.unip.apilivrariaautomatizada.model.dto.LivroDTO;
import br.com.unip.apilivrariaautomatizada.model.entity.GeneroLivro;
import br.com.unip.apilivrariaautomatizada.model.entity.Livro;
import br.com.unip.apilivrariaautomatizada.model.response.LivroResponse;
import br.com.unip.apilivrariaautomatizada.repository.GeneroLivroRepository;
import br.com.unip.apilivrariaautomatizada.repository.LivroRepository;
import br.com.unip.apilivrariaautomatizada.repository.spec.LivroSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livroRepository;
    private final GeneroLivroRepository generoLivroRepository;
    private final LivroMapper livroMapper;

    public void criarLivro(LivroDTO request) {

        GeneroLivro generoLivro = generoLivroRepository.findById(request.getGeneroLivroId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
        );

        try {
            Livro livro = Livro.builder()
                    .titulo(request.getTitulo())
                    .generoLivro(generoLivro)
                    .resumo(request.getResumo())
                    .autor(request.getAutor())
                    .anoLancamento(request.getAnoLancamento())
                    .editora(request.getEditora())
                    .build();

            livroRepository.save(livro);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public void atualizarLivro(Long id, LivroDTO request) {
        Livro livro = livroRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
        );

        try {
            livroMapper.toLivro(livro, request);
            livroRepository.save(livro);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public void deletarLivro(Long id) {
        Livro livro = livroRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
        );

        try {
            livroRepository.delete(livro);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public LivroResponse mostrarLivro(Long id) {
        Livro livro = livroRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
        );

        return livroMapper.toLivroResponse(livro);
    }

    public List<LivroResponse> mostrarTodosLivros(Long idGeneroLivro, String nomeLivro) {
        var spec = Specification.where(new LivroSpecification(idGeneroLivro, nomeLivro));
        List<Livro> livroList = livroRepository.findAll(spec);
        return livroMapper.toLivroResponseList(livroList);
    }
}
