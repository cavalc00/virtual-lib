package br.com.unip.apilivrariaautomatizada.controller;

import br.com.unip.apilivrariaautomatizada.model.dto.UserDTO;
import br.com.unip.apilivrariaautomatizada.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public ResponseEntity<UserDTO> login(){
        UserDTO userDTO = userService.getTokenUser();
        return ResponseEntity.ok(userDTO);
    }
}
