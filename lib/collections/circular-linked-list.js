
var Collections = (function(c){
  var Sentinel = c.Utils.Sentinel;
  /**
   * Constructor for a ListNode element
   * @constructor
   * @param {Object}   object   the object contained within the node
   * @param {ListNode} next     the next ListNode
   * @param {ListNode}   previous the previous ListNode
   */
  var ListNode = function(object, next, previous){
    this.object  = object;
    this.next = next || Sentinel;
    this.previous = previous || Sentinel;
  };



  /**
   * A limited circular, doubly-linked list
   * @constructor
   * @param {[type]} elements [description]
   */
  var CircularLinkedList = function(elements){
    this.numberOfElements = 0;

    /**
     * @private
     * @type {Array[ListNode]}
     */
    this._nodes = [];

    /**
     * @private
     * @type {ListNode}
     */
    this._currentElement = Sentinel;

    /**
     * @private
     * @type {ListNode}
     */
    this._head = Sentinel;

    if (Array.isArray(elements) && elements.length) {
      var self = this;
      elements.forEach(function(element){
        self.push(element);
      });
    }

  };


  /**
   * Adds a new element to the list
   * @param  {Object} object the object to be stored in the list
   * @return {void}
   */
  CircularLinkedList.prototype.push = function(object) {
    // if this is the first element
    var node = Sentinel;
    
    if (!this.numberOfElements) {
      node = new ListNode(object);
      node.next = node.previous = node;
      this._head = node;
    } else if (this.numberOfElements === 1) {
      node = new ListNode(object, this._head, this._currentElement);
      this._head.next = this._head.previous = node;
    } else {
      node = new ListNode(object, this._head, this._currentElement);
      this._currentElement.next = node;
      this._head.previous = node;
    }

    this._currentElement = node;
    this._nodes.push(node);
    this.numberOfElements += 1;
  };


  /**
   * Returns the next element in the list
   * @return {Object} the next element
   */
  CircularLinkedList.prototype.nextElement = function() {
    if (this.isEmpty()) {
      throw new Error("You cannot call nextElement on an empty list");
    }

    var nextElement = this._currentElement.next;
    this._currentElement = nextElement;
    return nextElement.object;
  };



  /**
   * Returns the previous element in the list
   * @return {Object} the previous element
   */
  CircularLinkedList.prototype.previousElement = function() {
    if (this.isEmpty()) {
      throw new Error("You cannot call previousElement on an empty list");
    }

    var previousElement = this._currentElement.previous;
    this._currentElement = previousElement;
    return previousElement.object;
  };



  /**
   * Whether the list is empty
   * @return {Boolean} [description]
   */
  CircularLinkedList.prototype.isEmpty = function() {
    return !this.numberOfElements;
  };


  /**
   * Returns the elements comprising this list
   * in a new list.
   * @return {Array} the elements
   */
  CircularLinkedList.prototype.getElements = function() {
    return this._nodes.map(function(node){
      return node.object;
    });
  };


  /**
   * Moves the current position to location of the passed object,
   * if the object corresponds to an element stored in the list
   * @param  {Object} object a reference to an object stored in this list
   * @return {Boolean}        whether the list was moved
   */
  CircularLinkedList.prototype.move = function(object) {
    var requestedNode = this._nodes.filter(function(node){
      return node.object === object;
    })[0];

    if (!requestedNode) return false;

    this._currentElement = requestedNode;
    return true;

  };


  c.CircularLinkedList = CircularLinkedList;

  return c;

})(Collections || {});