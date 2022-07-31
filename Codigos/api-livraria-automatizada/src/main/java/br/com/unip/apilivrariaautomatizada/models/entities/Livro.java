package br.com.unip.apilivrariaautomatizada.models.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "livro")
public class Livro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdLivro")
    private Long id;

    @JoinColumn(name = "IdGenero", referencedColumnName = "IdGenero", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private GeneroLivro generoLivro;

    @JoinColumn(name = "IdResumo", referencedColumnName = "IdResumo", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private ResumoLivro resumoLivro;

    @Column(name = "Titulo")
    private String titulo;

    @Column(name = "Autor")
    private String autor;

    @Column(name = "Editora")
    private String editora;

    @Column(name = "Ano")
    private Integer anoLancamento;

}
