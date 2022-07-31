package br.com.unip.apilivrariaautomatizada.controller;

import br.com.unip.apilivrariaautomatizada.models.request.LivroCreateRequest;
import br.com.unip.apilivrariaautomatizada.service.LivroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/livros")
public class LivroController {

    private final LivroService service;

    @PostMapping
    public ResponseEntity<Void> criarLivro(@RequestBody LivroCreateRequest request){
        service.criarLivro(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
