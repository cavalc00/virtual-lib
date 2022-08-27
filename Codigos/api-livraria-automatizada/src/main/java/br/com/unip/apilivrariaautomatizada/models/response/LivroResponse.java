package br.com.unip.apilivrariaautomatizada.models.response;

import br.com.unip.apilivrariaautomatizada.models.entities.GeneroLivro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LivroResponse {

    private Long id;

    private GeneroLivro generoLivro;

    private String resumo;

    private String titulo;

    private String autor;

    private String editora;

    private Integer anoLancamento;

}
