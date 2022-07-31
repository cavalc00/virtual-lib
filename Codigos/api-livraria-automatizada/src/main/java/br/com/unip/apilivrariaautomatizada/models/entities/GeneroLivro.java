package br.com.unip.apilivrariaautomatizada.models.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "generolivro")
public class GeneroLivro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdGenero")
    private Long id;

    @Column(name = "Nome")
    private String nome;
}
