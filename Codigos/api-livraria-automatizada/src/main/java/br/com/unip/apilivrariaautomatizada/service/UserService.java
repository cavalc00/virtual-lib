package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.model.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    public UserDTO getTokenUser() {
        if (!isAuthenticated())
            return null;
        return (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public boolean isAuthenticated() {
        return SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
    }
}
