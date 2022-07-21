class Tree {
    constructor() {
        this.value = null;
        this.left = null;
        this.right = null;
    }
    set(value) {
        if (this.value) {
            if (value.id_nombre < this.value.nombre) {
                this.setLeft(value);
            } else {
                this.setRight(value);
            }
        }
        else {
            this.value = value;
        }
    }
    setLeft(value) {
        if (this.left) {
            this.left.set(value);
        } else {
            this.left = new Tree();
            this.left.set(value);
        }
    }
    setRight(value) {
        if (this.right) {
            this.right.set(value);
        } else {
            this.right = new Tree();
            this.right.set(value);
        }
    }
}
const datos = [{ 'nombre': '5', 'edad': '14', 'mascota': 'firulais' },
{ 'nombre': '8', 'edad': '15', 'mascota': 'firulais' },
{ 'nombre': '4', 'edad': '17', 'mascota': 'firulais' },
{ 'nombre': '9', 'edad': '12', 'mascota': 'firulais' },
{ 'nombre': '3', 'edad': '23', 'mascota': 'firulais' },
{ 'nombre': '7', 'edad': '19', 'mascota': 'este es el 7' },
{ 'nombre': '2', 'edad': '16', 'mascota': 'firulais' }];
const tree = new Tree();
for (i = 0; i < datos.length; i++) {
    tree.set(datos[i]);
}
console.log(tree);
function Inorder(tree) { //raiz, luego izquierdo y al ultimo derecho
    if (tree.left) {
        Inorder(tree.left);
    }
    console.log(tree.value.nombre);
    if (tree.right) {
        Inorder(tree.right);
    }
}
Inorder(tree);
function Busqueda(tree, value) {

    if (value < tree.value.nombre) {
        Busqueda(tree.left, value)
    }
    else if (value > tree.value.nombre) {
        Busqueda(tree.right, value)
    }
    else if (value == tree.value.nombre)
        console.log(tree.value.mascota);

}
Busqueda(tree, '7');

 