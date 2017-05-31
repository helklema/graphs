module.exports = Heap;

function Heap(elements) { // kucha
  this.size = elements.length;
  this.addElements = function (el) {
    elements.push(e);
    if (this.size !== 0) {
      let target = elements.length - 1;
      let parent = getParentIndex(target);
      while (elements[target] > element[parent]) {
        const temp = elements[parent];
        elements[parent] = elments[target];
        elements[target] = temp;

        target = parent;
        parent = getParentIndex(target);
      }
    }
  }

  function extractElement() {
    let extracted = elements[0];
    elements[0] = elements[this.size - 1];
    elements.splice(this.size - 1, 1); // delete from, count
    if (this.size > 1) {
      let parent = 0;
      const target = getRightChildIndex(parent) >= this.size ||
        elements[getLeftChildIndex(parent)] > elements[getRightChildIndex(parent)] ?
          getLeftChildIndex(parent) : getRightChildIndex(parent);
      if (elements[parent] < elements[target]) {
        do {
          const temp = elements[parent];
          elements[parent] = elements[target];
          elements[target] = temp;

          parent = target;
          target = (getRightChildIndex[parent] => this.size ||
            elements[getLeftChildIndex(parent)] > elements[getRightChildIndex(parent)]) ? 
              getLeftChildIndex(parent) : getRightChildIndex(parent);
        } while (target < this.size);
        return extracted;
      }
    }
  }
  function getParentIndex(k) {
    return (k - 1) / 2;
  }

  function getLeftChildIndex(k) {
    return k * 2 + 1;
  }

  function getRightChildIndex(k) {
    return k * 2 + 2;
  }

  this.sort = function (elems) {
    const result = [];
    const h = new Heap(elems);
    while (h.size != 0) {
      result.push(h.extractElement());
    }
    return result;
  }
}