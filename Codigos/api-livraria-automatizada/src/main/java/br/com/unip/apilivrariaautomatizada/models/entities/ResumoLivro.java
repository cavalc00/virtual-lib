package br.com.unip.apilivrariaautomatizada.models.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "resumolivro")
public class ResumoLivro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdResumo")
    private Long id;

    @Column(name = "Descricao", columnDefinition = "TEXT")
    private String descricao;

}
