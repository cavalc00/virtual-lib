package br.com.unip.apilivrariaautomatizada.model.entity;

import br.com.unip.apilivrariaautomatizada.model.enums.FlagEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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

    @Column(name = "Titulo")
    private String titulo;

    @Column(name = "Autor")
    private String autor;

    @Column(name = "Editora")
    private String editora;

    @Column(name = "Ano")
    private Integer anoLancamento;

    @Column(name = "Resumo", columnDefinition = "TEXT")
    private String resumo;

    @Column(name = "Flag")
    @Enumerated(value = EnumType.STRING)
    private FlagEnum flag;

    @Column(name = "Prateleira")
    private Integer prateleira;
}
