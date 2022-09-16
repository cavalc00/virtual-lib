package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.mapper.LivroMapper;
import br.com.unip.apilivrariaautomatizada.model.dto.ImageDTO;
import br.com.unip.apilivrariaautomatizada.model.request.LivroUpdateRequest;
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

    private final ImageService imageService;
    private final LivroRepository livroRepository;
    private final GeneroLivroRepository generoLivroRepository;
    private final LivroMapper livroMapper;

    public void criarLivro(LivroUpdateRequest request) {

//        GeneroLivro generoLivro = generoLivroRepository.findById(request).orElseThrow(
//                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
//        );
//
//        try {
//            Livro livro = Livro.builder()
//                    .titulo(request.getTitulo())
//                    .generoLivro(generoLivro.getId())
//                    .resumo(request.getResumo())
//                    .autor(request.getAutor())
//                    .anoLancamento(request.getAnoLancamento())
//                    .editora(request.getEditora())
//                    .build();
//
//            livroRepository.save(livro);
//        } catch (Exception e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
//        }
    }

    public void atualizarLivro(LivroUpdateRequest request) {
        Livro livro = livroRepository.findById(request.getId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
        );

        if (request.getGeneroLivro() != null) {
            GeneroLivro genero = generoLivroRepository.findById(request.getGeneroLivro().getId()).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item não encontrado")
            );

            livro.setGeneroLivro(genero);
        }

        if (request.getCapa() != null && request.getCapa().length() > 0) {
            imageService.UpdateOrSaveImageFromBase64(request.getId(), request.getCapa());
        }

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
        List<LivroResponse> response = livroMapper.toLivroResponseList(livroRepository.findAll(spec));

        try {
            List<ImageDTO> imageDTOList = imageService.getAllImages();
            for (LivroResponse livro : response) {
                ImageDTO dto = imageDTOList.stream().filter(imageDTO -> imageDTO.getId().equals(livro.getId())).findAny().orElse(null);
                if (dto != null) livro.setCapa(dto.getImagem());
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

        return response;
    }
}
