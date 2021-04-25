export interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

export enum TraverseType {
  Inorder,
  Preorder,
  Postorder,
  Breadth
}

export interface IBinaryTree<T> {
  // constructor(tree: TreeNode<T>): void;
  setTree(tree: TreeNode<T>): this;
  traverse(traverseType: TraverseType): T[];
  getColumn(columnOrder: number): T[];
}

export class BinaryTree<T> implements IBinaryTree<T> {
  protected tree: TreeNode<T>;

  constructor(tree: TreeNode<T>) {
    this.tree = tree;
  }

  get value() {
    return this.tree.value || undefined;
  }

  get left() {
    return this.tree.left || undefined;
  }
  get right() {
    return this.tree.right || undefined;
  }

  setTree(tree: TreeNode<T>): this {
    this.tree = tree;
    return this;
  }

  getColumn(columnOrder: number): T[] {
    const columnOrderResult: T[] = [];
    function recursiveColumn(treeNode: TreeNode<T>, currentColumn: number) {
      if (currentColumn === columnOrder) {
        columnOrderResult.push(treeNode.value);
      }
      if (treeNode.left) {
        recursiveColumn(treeNode.left, currentColumn - 1);
      }
      if (treeNode.right) {
        recursiveColumn(treeNode.right, currentColumn + 1);
      }
    }
    recursiveColumn(this.tree, 0)
    return columnOrderResult;
  }

  traverse(traverseType: TraverseType): T[] {
    let traverseResult: T[] = [];
    switch (traverseType) {
      case TraverseType.Breadth:
        traverseResult = this.BFT(this.tree);
        break;
    }
    return traverseResult;
  }

  private BFT(treeNode: TreeNode<T>): T[] {
    const BFTResult: T[] = [];
    const queue: Array<TreeNode<T>> = [];
    queue.push(treeNode)
    while (queue.length > 0) {
      const currentNode = queue.shift() as TreeNode<T>;
      BFTResult.push(currentNode.value);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return BFTResult;
  }
}