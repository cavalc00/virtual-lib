package br.com.unip.apilivrariaautomatizada.service;

import br.com.unip.apilivrariaautomatizada.config.ApplicationProperties;
import br.com.unip.apilivrariaautomatizada.model.dto.ImageDTO;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import javax.sql.rowset.serial.SerialBlob;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ApplicationProperties properties;

    private final String fileSeparator = System.getProperty("file.separator");


    public List<ImageDTO> getImageById(List<Long> idLivroList) throws IOException, SQLException {
        List<String> allImagesPaths = new ArrayList<>();
        List<ImageDTO> allImages = new ArrayList<>();
        Map<Long, String> pathByImageId = new HashMap<>();

        try (Stream<Path> pathStream = Files.list(Paths.get(properties.getImagesPath() + fileSeparator))) {
            allImagesPaths = pathStream.filter(file -> !Files.isDirectory(file))
                    .map(Path::toAbsolutePath)
                    .map(Path::toString)
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        for (String path : allImagesPaths) {
            List<String> stringList = Arrays.stream(path.split("\\\\")).collect(Collectors.toList());
            String nameWithSufix = stringList.get(stringList.size() - 1);
            String imageName = Arrays.stream(nameWithSufix.split("\\.")).findFirst().orElse(null);

            if (Objects.nonNull(imageName)) {
                pathByImageId.putIfAbsent(Long.parseLong(imageName), path);
            }
        }


        for (Long imagePath : pathByImageId.keySet()) {
            if (!StringUtils.hasLength(pathByImageId.get(imagePath))) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Image Not Found: " + imagePath);
            }

            allImages.add(
                    ImageDTO.builder()
                            .id(imagePath)
                            .imagem(new SerialBlob(IOUtils.toByteArray(new FileInputStream(pathByImageId.get(imagePath)))))
                            .build()


            );
        }

        return allImages;
    }

}
