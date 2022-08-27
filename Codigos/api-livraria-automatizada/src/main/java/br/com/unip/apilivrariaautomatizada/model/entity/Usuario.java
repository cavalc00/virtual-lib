package br.com.unip.apilivrariaautomatizada.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdUsuario")
    private Long id;

    @Column(name = "Nome")
    private String nome;

    @Column(name = "Cpf")
    private String cpf;

    @Column(name = "Email")
    private String email;

    @Column(name = "Login")
    private String login;

    @Column(name = "Senha")
    private String senha;

}
