package BinarySearchTreeApp.BinaryTree;

public class TreeDTO {
    private Integer number;
    private TreeDTO left;
    private TreeDTO right;

    // Getters and setters
    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public TreeDTO getLeft() {
        return left;
    }

    public void setLeft(TreeDTO left) {
        this.left = left;
    }

    public TreeDTO getRight() {
        return right;
    }

    public void setRight(TreeDTO right) {
        this.right = right;
    }
}
