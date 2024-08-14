package BinarySearchTreeApp.BinaryTree;

import BinarySearchTreeApp.BinaryTree.TreeNode;

public class BinarySearchTree {
    private TreeNode root;


    public static class TreeNode {
        private Integer number;
        private TreeNode left;
        private TreeNode right;

        public TreeNode(Integer number) {
            this.number = number;
            this.left = null;
            this.right = null;
        }

        // Getters and setters
        public Integer getNumber() {
            return number;
        }

        public void setNumber(Integer number) {
            this.number = number;
        }

        public TreeNode getLeft() {
            return left;
        }

        public void setLeft(TreeNode left) {
            this.left = left;
        }

        public TreeNode getRight() {
            return right;
        }

        public void setRight(TreeNode right) {
            this.right = right;
        }
    }

    public BinarySearchTree() {
        this.root = null;
    }


    public void insert(Integer number) {
        root = insertRec(root, number);
    }

    private TreeNode insertRec(TreeNode root, Integer number) {
        if (root == null) {
            root = new TreeNode(number);
            return root;
        }

        if (number < root.getNumber()) {
            root.setLeft(insertRec(root.getLeft(), number));
        } else if (number > root.getNumber()) {
            root.setRight(insertRec(root.getRight(), number));
        }

        return root;
    }

    public TreeNode getRoot() {
        return root;
    }
}
