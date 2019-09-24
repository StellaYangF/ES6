function inorder (tree) {
  if (tree) {
    yield* inorder(tree.left);
    yield tree.label;
    yield* inorder(tree.right);
  }
}
export default inorder;