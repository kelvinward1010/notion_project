interface Item {
    id: string;
    title: string;
    level: number;
    parent: string;
    children?: Item[];
}

// Hàm để tạo cây từ dữ liệu
export function createTree(arr: Item[], parent = ''): Item[] {
    let tree: Item[] = [];
    arr.filter(item => item.parent === parent)
       .forEach(item => {
           let children = createTree(arr, item.id);
           if (children.length) {
               item.children = children;
           }
           tree.push(item);
       });
    return tree;
}


interface Node {
    id: string;
    title: string;
    level: number;
    parent: string;
    children?: Node[];
}

export function hanldeMapData(data: Node[]): Node[] {
    const idToNode: { [key: string]: Node } = {};
    const rootNodes: Node[] = [];

    for (const item of data) {
        item.children = [];
        idToNode[item.id] = item;
        if (item.parent) {
            idToNode[item?.parent]?.children?.push(item);
        } else {
            rootNodes.push(item);
        }
    }
    return rootNodes;
}