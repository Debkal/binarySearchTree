/* 

JS Fiddle for treemake function
let array = [1,2,3,4,5,6,7]
let mid =  Math.round(array.length/2);
let left = array.slice(0,mid-1);
let right = array.slice(array.length-mid+1);

console.log(left);
console.log(right);
console.log(mid+1);
console.log(mid-1);
console.log(array);
*/


class Node {
    constructor(data) {
        this.data = data;
        this.left =null;
        this.right =null;
    }
}

class binarySearch {
    constructor(){
        this.root = this.buildTree(array)
    }
    //merge sorts array for build tree
    sortArray(array){
        const sortedArray = array.sort(function(a,b){return a-b});
        return sortedArray;
    }
    //builds the tree out of sorted array
    buildTree(array){
        const sortedArray = this.sortArray(array);
        if(sortedArray.length===0){
            return null;
        }
        const mid = Math.floor(sortedArray.length/2);
        const newRoot = new Node(sortedArray[mid]);
        newRoot.left = this.buildTree(sortedArray.slice(0,mid));
        newRoot.right = this.buildTree(sortedArray.slice(mid+1));
        return newRoot;
    }
    //prints the binary tree in a graphic
    prettyPrint (node =this.root, prefix = '', isLeft = true){
        if (node.right) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
    //inserts a node into the tree
    insert(data,root=this.root){
        if(root== null){
            return root = new Node(data);
        }
        if(data<root.data){
            root.left= this.insert(data,root.left);
        }else if(data>root.data){
            root.right= this.insert(data,root.right);
        }
        return root;
    }
    //removes a node from the tree
    remove(data,root=this.root){
        if(root==null){
            return root;
        }
        if(data<root.data){
            root.left = this.remove(data,root.left);
        }
        else if(data>root.data){
            root.right= this.remove(data,root.right);
        }
        else{
            if(root.left==null){
                return root.right
            }
            else if(root.right==null){
                return root.left
            }
            root.data = this.#minValue(root.right);

            root.right = this.remove(root.data,root.right);
        }
        return root;
    }
    //helper function for removing a node from the tree
    #minValue(root=this.root){
        let minv = root.data;
            while(root.left !=null){
                minv = root.left.data;
                root = root.left;
            }
            return minv;
    }
    //returns the specified node in the tree
    find(data,root=this.root){
        if(root==null || root.data==data){
            return root;
        }
        if(root.data <data){
            return this.find(data,root.right);
        }
        return this.find(data,root.left);
    }
    //returns the order of nodes in seperate array's based off the height level
    levelOrder(callback){
        let queue=[this.root]
        let results =[];
        while (queue.length != 0){
            let level = [];
            let size =  queue.length;
            for(let i=0; i<size; i++){
                let tempRoot = queue.shift()
                level.push(tempRoot.data);
                if(tempRoot.left != null){
                    queue.push(tempRoot.left);
                }
                if(tempRoot.right != null){
                    queue.push(tempRoot.right);
                }
                if(callback){
                    callback(tempRoot);
                }
            }
            results.push(level);
        }
       
        if(!callback){
            return results;
        }
    }
    //returns the nodes in ascending order
    inorder(root=this.root,callback,result=[]){
        if(root==null){
            return;
        }
        this.inorder(root.left,callback,result);
        if(callback){
            callback(root);
        }else{
            result.push(root.data)
        };
        this.inorder(root.right,callback,result);
        return result;
        
    }
    //returns the nodes in level order starting from root descending down the levels starting left children to right children
    preorder(root=this.root,callback,result=[]){
        if(root==null)return;
        if(callback){
            callback(root);
        }else{
            result.push(root.data);
        }
        this.preorder(root.left,callback,result);
        this.preorder(root.right,callback,result);
        return result;
    }
    //returns the nodes in postfix expression(the root follows the node children)
    postorder(root=this.root,callback,result=[]){
        if(root==null)return;
        this.postorder(root.left,callback,result);
        this.postorder(root.right,callback,result);
        if(callback){
            callback(root);
        }else{
            result.push(root.data);
        }
        return result;
    }
    // returns the height of thre tree
    height(root=this.root){
        if (root==null){
            return 0;
        }
        else{
            let leftHeight = this.height(root.left);
            let rightHeight = this.height(root.right);

            if(leftHeight > rightHeight){
                return (leftHeight+1);
            }else{
                return (rightHeight+1);
            }
        }
    }
    //returns the root depth of the tree
    depth(root=this.root){
        let dist = -1;
        if(root==null)return dist;
        else{
            dist = this.depth(root.left) >= 0 || this.depth(root.right) >= 0
            return dist +1;
        }
        
    }
    //return whether the tree is balanced or not
    isBalanced(root=this.root){
        if(root==null)return true;
        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);
        if(Math.abs(leftHeight-rightHeight)<=1 
        && this.isBalanced(root.left)==true 
        && this.isBalanced(root.right)==true)
        {
            return true;
        }
        return false;
    }
    //rebalances the tree using inorder traversal
    rebalance(){
        if(this.root==null)return;
        const result = this.inorder();
        return this.root= this.buildTree(result);
    }
}

let array = [1,3,2,5,4,7]
let tree = new binarySearch(array);
tree.insert(10);
tree.remove(7);
console.log(tree.find(2));
console.log(tree.height());
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.depth());
tree.insert(6);
console.log(tree.isBalanced());
tree.prettyPrint();
console.log(tree.rebalance());
console.log(tree.isBalanced());
tree.prettyPrint();