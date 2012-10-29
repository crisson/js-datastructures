A few useful collections and abstractions in JavaScript.

### Circular, Doubly-Linked List

    var list = new Collections.CircularLinkedList(['foo', 'bar', 'baz', 'boo']);
    list.nextElement() // foo
    list.nextElement() // bar
    list.previousElement() // foo

### BufferedLoader

This object makes it easy to retrieve documents from a datastore for actions like infinite scroll.

    var loader = new Collections.Abstraction.BufferedLoader({
      source : 'http://google.com',
      step : 10,
      urlHandler : function(resp){
        // knows what to do with response....
        // returns an array
      },
      loadOnDrain : true
    })


### Tests

See `spec/SpecRunner.html` for tests