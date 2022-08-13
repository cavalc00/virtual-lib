package br.com.unip.apilivrariaautomatizada.models.entities;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "usuario")
public class LocacaoLivro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdLocacao")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdUsuario", referencedColumnName = "IdUsuario", nullable = false)
    private Usuario usuario;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdLivro", referencedColumnName = "IdLivro", nullable = false)
    private Livro livro;

    @Column(name = "DataLocado", nullable = false)
    private LocalDate dataLocado;

    @Column(name = "DateDevolvido")
    private LocalDate dateDevolvido;

}