module.exports = Bucket;

function Bucket(count) {  //ЧЕРПАКИ, ВСТАВКА, УДАЛЕНИЕ
  const bucket = [];
  for (let k = 0; k < count; k += 1) {
    bucket[k] = [];
  }
  this.length = bucket.length;
  this.insert = insert;
  this.remove = remove;
  this.get = get;

  function insert(i, r) {
    bucket[r].push(i);
  }

  function remove(i, r) {
    const index = bucket[r].indexof(i);
    if (index != -1) {
      bukcet[r].splice(index, 1);
    }
  }

  function get(r) {
    return bucket[r].length != 0 ? bucket[r].shift() : -1;
  }
}