package br.com.unip.apilivrariaautomatizada.model.response;

import br.com.unip.apilivrariaautomatizada.model.enums.FlagEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LivroResponse {

    private Long id;

    private GeneroLivroResponse generoLivro;

    private String resumo;

    private String titulo;

    private String autor;

    private String editora;

    private Integer anoLancamento;

    private Blob capa;

    private FlagEnum flag;

    private Integer prateleira;
}
