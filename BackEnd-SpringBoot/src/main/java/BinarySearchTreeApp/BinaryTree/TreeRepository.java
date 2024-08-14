package BinarySearchTreeApp.BinaryTree;

import BinarySearchTreeApp.BinaryTree.TreeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreeRepository extends JpaRepository<TreeEntity, Long> {
    TreeEntity findTopByOrderByIdDesc();
}
