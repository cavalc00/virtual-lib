package br.com.unip.apilivrariaautomatizada.controller;

import br.com.unip.apilivrariaautomatizada.models.dto.LivroDTO;
import br.com.unip.apilivrariaautomatizada.models.response.LivroResponse;
import br.com.unip.apilivrariaautomatizada.service.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/livro")
public class LivroController {

    private final LivroService service;

    @PostMapping
    public ResponseEntity<Void> criarLivro(@RequestBody LivroDTO request) {
        service.criarLivro(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarLivro(@PathVariable("id") Long id, @RequestBody LivroDTO request) {
        service.atualizarLivro(id, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLivro(@PathVariable("id") Long id) {
        service.deletarLivro(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroResponse> mostrarLivro(@PathVariable("id") Long id) {
        LivroResponse response = service.mostrarLivro(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<LivroResponse>> mostrarTodosLivros() {
        List<LivroResponse> livros = service.mostrarTodosLivros();
        return ResponseEntity.ok(livros);
    }
}
