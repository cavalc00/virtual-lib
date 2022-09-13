package br.com.unip.apilivrariaautomatizada.model.dto;

import br.com.unip.apilivrariaautomatizada.model.entity.GeneroLivro;
import br.com.unip.apilivrariaautomatizada.model.enums.GeneroEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.sql.Blob;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LivroDTO {

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
