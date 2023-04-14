export {};

declare global {
  interface Array<T> {
    updateAll(...items: Array<T>): Array<T>;
    updateAll(items: Array<T> | T): Array<T>;
  }
}

Array.prototype.updateAll = function<T> (...items: Array<T>): Array<T> {
  return this.splice(0, this.length, ...items);
};

Array.prototype.updateAll = function<T> (items: Array<T> | T): Array<T> {
  if (items === undefined) {
    return this.splice(0, this.length);
  }
  else if (!Array.isArray(items)) {
    return this.splice(0, this.length, items);
  }
  else {
    return this.splice(0, this.length, ...items);
  }
};
