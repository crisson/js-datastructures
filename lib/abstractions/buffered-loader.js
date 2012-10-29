var Collections = (function (c) {
  c.Abstractions = c.Abstractions || {};


  function validateUrl(s){
    return ['https', 'http'].indexOf( s.substring(0, s.indexOf(':')) ) !== -1;
  }

  function URLLoader(pointer) {
    this.url = pointer;
  }

  function processSource(pointer){
    if (typeof pointer === 'string') {
      return validateUrl(pointer) && new URLLoader(pointer);
    }
  }

  /**
   * A BufferedLoader regulates the loading of content from a resource
   * @constructor
   * @param {Object} options parameters corresponding to the source, step size, etc.
   */
  var BufferedLoader = function(options){
    options = options || {};
    if (!options.source) throw new Error('You must provider a source');

    /**
     * Whether more records than are immediately requested should be cached
     * @type {Boolean}
     */
    options.buffer = options.buffer || false;

    /**
     * The maximum number of elements that should be returned from the resource
     * @type {Number|Sentinel}
     */
    options.limit = options.limit || Collections.Utils.Sentinel;

    /**
     * Whether this class should load more elements when a client calls `drain`,
     * or whether more elements should be drained on class instantiation.
     * @type {Boolean}
     */
    options.loadOnDrain = options.loadOnDrain || false;


    /**
     * A function for handling a request from the url source specified.  The
     * function is applied to the json response from the web service queried
     * @type {Function}
     */
    options.urlHandler = options.urlHandler || function(){ return []; };

    this._options = options;

    /**
     * Instance type of the loader handling the source specified
     * @private
     * @type {BufferedLoader}
     */
    this._loader = processSource(options.source);
    if (!this._loader) {
      throw new TypeError('Invalid source submitted');
    }

    /**
     * Buffer containing pre-cached elements that will be moved to readyBuffer
     * after readyBuffer is next drained.  This buffer is only populated if the
     * class constructor's options hash contains a boolean turning on pre-fetching.
     * @private
     * @type {Array}
     */
    this._backBuffer = [];

    /**
     * Buffer containing the next batch of elements to be returned to the caller
     * @private
     * @type {Array}
     */
    this._readyBuffer = [];


    /**
     * The number of elements retrieved
     * @private
     * @type {Number}
     */
    this._recordsRetrieved = 0;
  };

  /**
   * Returns additional elements from the buffer, with the number of
   * elements limited to the limit specified in this class' constructor
   * @return {Array[Any]}
   */
  BufferedLoader.prototype.drain = function() {
    var elements = [];

    if (this._options.loadOnDrain) {
      this._load(function(){

      });
    }


    if (this._readyBuffer.length) {
      elements = this._readyBuffer.slice();
      this._readyBuffer.length = 0;
    }

    this._afterDrain();
    return elements;
  };


  /**
   * Drains all cached elements
   * @return {[type]} [description]
   */
  BufferedLoader.prototype.drainAll = function() {
    var elements = this._readyBuffer.splice().concat(this._backBuffer.splice());
    this._afterDrain();
    return elements;
  };


  BufferedLoader.prototype._afterDrain = function(){
    var limit = this._options.limit;
    if (this._options.buffer && this._backBuffer.length) {
      this._readyBuffer = this._backBuffer.splice(0, this._options.step);
    }

    if (limit !== Collections.Utils.Sentinel && this._recordsRetrieved >= limit )  {
      return this.close();
    }

    this._load();

  };


  /**
   * Loads the next batch of elements from a resource
   * @return {[type]} [description]
   */
  BufferedLoader.prototype._load = function() {
    
  };


  /**
   * Resets the loader, closing any network connections being maintained
   * @return {void}
   */
  BufferedLoader.prototype.close = function() {
    return this._loader && this._loader.close();
  };




  c.Abstractions.BufferedLoader = BufferedLoader;
  return c;
})(Collections || {});