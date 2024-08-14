package BinarySearchTreeApp.BinaryTree;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class TreeService {

    @Autowired
    private TreeRepository treeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public TreeEntity createTree(String numbers) throws JsonProcessingException {
        if (numbers == null || numbers.trim().isEmpty()) {
            throw new IllegalArgumentException("Number string cannot be null or empty");
        }

        List<Integer> numberList = Arrays.stream(numbers.split(","))
                .map(String::trim)
                .filter(num -> !num.isEmpty())
                .map(Integer::parseInt)
                .collect(Collectors.toList());

        if (numberList.isEmpty()) {
            throw new IllegalArgumentException("No valid numbers found in the input string");
        }

        BinarySearchTree bst = new BinarySearchTree();
        for (Integer number : numberList) {
            bst.insert(number);
        }

        String treeJson = objectMapper.writeValueAsString(bst.getRoot());

        TreeEntity treeEntity = new TreeEntity(numbers, treeJson);
        return treeRepository.save(treeEntity);
    }

    public List<TreeEntity> fetchPreviousTrees() {
        return treeRepository.findAll();
    }
}
