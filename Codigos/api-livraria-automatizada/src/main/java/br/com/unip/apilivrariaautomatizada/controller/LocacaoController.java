package br.com.unip.apilivrariaautomatizada.controller;

import br.com.unip.apilivrariaautomatizada.service.LocacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/locacao")
public class LocacaoController {

    private final LocacaoService locacaoService;

    @PostMapping("/{livroId}")
    public ResponseEntity<String> registerNewTenancy(@PathVariable("livroId") Long livroId, @RequestParam String userLogin) {
        String newTenancy = locacaoService.registerNewTenancy(livroId, userLogin);
        return ResponseEntity.ok(newTenancy);
    }

    @PutMapping("/{livroId}")
    public ResponseEntity<Void> returnBook(@PathVariable("livroId") Long livroId) {
        locacaoService.returnBook(livroId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/compare")
    public ResponseEntity<Boolean> isReservedByUser(Long idBook, String email) {
        return ResponseEntity.ok(locacaoService.isReservedByUser(idBook, email));
    }
}
