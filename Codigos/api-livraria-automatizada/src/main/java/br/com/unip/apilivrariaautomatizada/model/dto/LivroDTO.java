package br.com.unip.apilivrariaautomatizada.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LivroDTO {

    private String titulo;

    private Long generoLivroId;

    private String resumo;

    private String autor;

    private String editora;

    private Integer anoLancamento;
}
