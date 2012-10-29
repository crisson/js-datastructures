describe("A CircularLinkedList", function(){
  var elements, list;


  beforeEach(function(){
    elements = ['foo', 'bar', 'baz', 'boo'];
    list = new Collections.CircularLinkedList(elements);
  });

  describe('may take an array of elements as its constructor param', function(){
    it('including strings,', function(){
      list = new Collections.CircularLinkedList(elements);
      expect(list.getElements()).toEqual(elements);
    });

    it('numbers,', function(){
      elements = [1, 2, 3, 4, 5];
      list = new Collections.CircularLinkedList(elements);
      expect(list.getElements()).toEqual(elements);
    });

    it('and objects', function(){
      elements = [
        { word : 'foo' },
        { word : 'pho' },
        { word : 'baz' },
        { word : 'bar' },
        { word : 'bum' }
      ];

      list = new Collections.CircularLinkedList(elements);
      expect(list.getElements()).toEqual(elements);
    });
  });

  describe('#push', function(){
    var elements = ['f'];

    it('adds an element to this list', function(){
      list = new Collections.CircularLinkedList(elements);
      expect(list.getElements().length).toBe(1);

      list.push('o');
      expect(list.getElements().length).toBe(2);
    });
  });

  describe('#isEmpty', function(){
    it('return true if a list is empty', function(){
      expect( new Collections.CircularLinkedList().isEmpty() ).toBe(true);
    });

    it('otherwise false', function(){
      expect(new Collections.CircularLinkedList(['f']).isEmpty() ).toBe(false);

      list = new Collections.CircularLinkedList();
      list.push(['f']);
      expect(list.isEmpty()).toBe(false);
    });
  });

  describe('#getElements', function(){
    it('returns a NEW array containing all elements added to the list', function(){
      expect(list.getElements()).toEqual(elements);
    });
  });

  describe('#nextElement', function(){
    it('starts with the first element', function(){
      var current = list.nextElement();
      expect(current).toBe(elements[0]);
    });

    it('and makes the current element the prior elements\'s successor', function(){
      list.nextElement();
      var next = list.nextElement();
      expect(next).toBe(elements[1]);
    });

    it('a single-element list always points to itself', function(){
      list = new Collections.CircularLinkedList(['f']);
      expect(list.nextElement()).toEqual('f');
      expect(list.nextElement()).toEqual('f');
    });
  });

  describe('#previousElement', function(){
    it('starts with the second-to-last element', function(){
      var current = list.previousElement();
      expect(current).toBe(elements[2]);
    });

    it('and makes the current element the previous element\'s predecessor', function(){
      list.previousElement();
      var next = list.previousElement();
      expect(next).toBe(elements[1]);
    });
  });

  describe('#move', function(){
    it('moves the current element to the index of the passed in object', function(){
      expect(list.move('bar')).toBe(true);
      expect(list.nextElement()).toBe('baz');
    });

    it('or returns false if the object does not exist in the collection', function(){
      expect(list.move('foobar')).toBe(false);
    });
  });

});