package BinarySearchTreeApp.BinaryTree;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/trees")
public class TreeController {

    @Autowired
    private TreeService treeService;

    @PostMapping("/process")
    public ResponseEntity<?> processNumbers(@RequestBody String numbers) {
        try {
            TreeEntity treeEntity = treeService.createTree(numbers);
            TreeDTO treeDTO = convertToTreeDTO(treeEntity);
            return ResponseEntity.ok(treeDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid input: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing numbers: " + e.getMessage());
        }
    }

    @GetMapping("/previous")
    public ResponseEntity<List<TreeDTO>> getPreviousTrees() {
        List<TreeEntity> trees = treeService.fetchPreviousTrees();
        List<TreeDTO> treeDTOs = trees.stream()
                .map(this::convertToTreeDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(treeDTOs);
    }

    private TreeDTO convertToTreeDTO(TreeEntity treeEntity) {
        TreeDTO treeDTO = null;
        try {
            treeDTO = new ObjectMapper().readValue(treeEntity.getTreeJson(), TreeDTO.class);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return treeDTO;
    }
}
