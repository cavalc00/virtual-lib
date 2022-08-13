package br.com.unip.apilivrariaautomatizada.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LivroDTO {

    private String title;

    private String autor;

    private String editor;

    private Integer year;
}
