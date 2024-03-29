package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.model.entity.Livro;
import br.com.unip.apilivrariaautomatizada.model.entity.LocacaoLivro;
import br.com.unip.apilivrariaautomatizada.model.entity.Usuario;
import br.com.unip.apilivrariaautomatizada.model.enums.FlagEnum;
import br.com.unip.apilivrariaautomatizada.repository.LivroRepository;
import br.com.unip.apilivrariaautomatizada.repository.LocacaoLivroRepository;
import br.com.unip.apilivrariaautomatizada.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

import static br.com.unip.apilivrariaautomatizada.model.enums.FlagEnum.DISPONIVEL;

@Service
@RequiredArgsConstructor
public class LocacaoService {

    private final LocacaoLivroRepository locacaoLivroRepository;

    private final LivroRepository livroRepository;

    private final UsuarioRepository usuarioRepository;

    public String registerNewTenancy(Long idLivro, String userLogin) {
        Livro livro = livroRepository.findById(idLivro).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        Usuario usuario = usuarioRepository.findByEmail(userLogin).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND)
        );

        if (livro.getFlag() == DISPONIVEL) {
            LocacaoLivro locacaoLivro = LocacaoLivro.builder()
                    .livro(livro)
                    .usuario(usuario)
                    .dataLocado(LocalDate.now())
                    .dataDevolvido(null)
                    .build();

            LocacaoLivro locacaoSalva = locacaoLivroRepository.save(locacaoLivro);

            livro.setFlag(FlagEnum.RESERVADO);
            livroRepository.save(livro);

            return "Livro" + livro.getTitulo() + " alugado em " + locacaoSalva.getDataLocado().toString();
        } else {
            return "Livro" + livro.getTitulo() + " indisponivel";
        }
    }

    public void returnBook(Long livroId) {
        Livro livro = livroRepository.findById(livroId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        LocacaoLivro locacaoLivro = locacaoLivroRepository.findByIdLivro(livroId).stream().findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        livro.setFlag(DISPONIVEL);
        locacaoLivro.setDataDevolvido(LocalDate.now());

        livroRepository.save(livro);
        locacaoLivroRepository.save(locacaoLivro);
    }


    public Boolean isReservedByUser(Long idBook, String email) {
        LocacaoLivro locacaoLivro = locacaoLivroRepository.findByIdLivro(idBook).stream().findFirst().orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return locacaoLivro.getUsuario().getEmail().equals(email);
    }
}
