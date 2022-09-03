package br.com.unip.apilivrariaautomatizada.controller;

import br.com.unip.apilivrariaautomatizada.model.dto.LivroDTO;
import br.com.unip.apilivrariaautomatizada.model.response.LivroResponse;
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

    private final LivroService livroService;

    @PostMapping
    public ResponseEntity<Void> criarLivro(@RequestBody LivroDTO request) {
        livroService.criarLivro(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> atualizarLivro(@PathVariable("id") Long id, @RequestBody LivroDTO request) {
        livroService.atualizarLivro(id, request);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarLivro(@PathVariable("id") Long id) {
        livroService.deletarLivro(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LivroResponse> mostrarLivro(@PathVariable("id") Long id) {
        LivroResponse response = livroService.mostrarLivro(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<LivroResponse>> mostrarTodosLivros() {
        List<LivroResponse> livros = livroService.mostrarTodosLivros();
        return ResponseEntity.ok(livros);
    }
}
