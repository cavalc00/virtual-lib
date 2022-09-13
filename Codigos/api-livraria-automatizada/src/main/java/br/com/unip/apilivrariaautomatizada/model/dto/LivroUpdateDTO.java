package br.com.unip.apilivrariaautomatizada.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LivroUpdateDTO {

    @NotBlank
    private Long id;

    private String titulo;

    private GeneroLivroDTO generoLivro;

    private String resumo;

    private String autor;

    private String editora;

    private Integer anoLancamento;

    private Boolean flagDisponivel;

    private String capa;
}
