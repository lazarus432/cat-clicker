//model

var model = {
    current_cat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Henry',
            imgSrc : 'img/cat1.jpg'
        },
        {
            clickCount : 0,
            name : 'Bajheera',
            imgSrc : 'img/cat2.jpg'
        },
        {
            clickCount : 0,
            name : 'Kaan',
            imgSrc : 'img/cat3.jpg'
        },
        {
            clickCount : 0,
            name : 'Claw',
            imgSrc : 'img/cat4.jpg'
        },
        {
            clickCount : 0,
            name : 'Mittens',
            imgSrc : 'img/cat5.jpg'
        }
    ]
};


//octopus

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.current_cat = model.cats[0];

        // tell our views to initialize
        list_view.init();
        display_view.init();
    },

    get_currentCat: function() {
        return model.current_cat;
    },

    get_cats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    set_currentCat: function(cat) {
        model.current_cat = cat;
    },

    // increments the counter for selected cat
    inc_counter: function() {
        model.current_cat.clickCount++;
        display_view.render();
    },

    // open admin-view
    cat_details: function() {
      return model.current_cat;
    },

    // save user input
    save_cat_details: function(name, image, click) {
      model.current_cat.name = name;
      model.current_cat.imgSrc = image;
      model.current_cat.clickCount = click;

      return model.current_cat;
    }

};


//views

var display_view = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.cat = document.getElementById('cat');
        this.name = document.getElementById('cat-name');
        this.image = document.getElementById('cat-image');
        this.count = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.image.addEventListener('click', function(){
            octopus.inc_counter();
        });
        this.render();
    },

    render: function() {
        var current_cat = octopus.get_currentCat();
        this.count.textContent = current_cat.clickCount;
        this.name.textContent = current_cat.name;
        this.image.src = current_cat.imgSrc;
    }
};

var list_view = {

    init: function() {
        // store element for later
        this.list_elem = document.getElementById('cat-list');

        this.render();
    },

    render: function() {
        var cat, element, i; //initialize variables
        var cats = octopus.get_cats(); //get cats from octopus
        this.list_elem.innerHTML = ''; //empty the cat list

        // loop through cats
        for (i = 0; i < cats.length; i++) {
            cat = cats[i];
            element = document.createElement('button');
            element.textContent = cat.name;

            element.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.set_currentCat(catCopy);
                    display_view.render();
                };
            })(cat));

            // finally, add the element to the list
            this.list_elem.appendChild(element);
        }
    }
};

// launch
octopus.init();
