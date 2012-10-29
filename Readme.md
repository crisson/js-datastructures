A few useful collections and abstractions in JavaScript.

### Circular, Doubly-Linked List

    var list = new Collections.CircularLinkedList(['foo', 'bar', 'baz', 'boo']);
    list.nextElement() // foo
    list.nextElement() // bar
    list.previousElement() // foo


### Tests

See `spec/SpecRunner.html` for tests