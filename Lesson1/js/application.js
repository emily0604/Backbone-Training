/**
 * Created by scomical on 10/29/2015.
 */
console.log('day')
var app = {};

app.Product = Backbone.Model.extend({
    defaults: {
        name: "",
        completed: false
    }
});

app.ProductList = Backbone.Collection.extend({
    model: app.Product,
    localStorage: new Store("product")
});

app.productList = new app.ProductList();

/**
 * View
 */
app.ProductView = Backbone.View.extend({
    tagName: "tr",
    template: _.template($("#product-template").html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

app.AppView = Backbone.View.extend({
    el: "#product-management",
    initialize: function() {
        this.input = this.$("#product-name");
        app.productList.on("add", this.addAll, this);
        app.productList.on("reset", this.addAll, this);
        app.productList.fetch();
    },
    events: {
        "keypress #product-name": "createProductOnEnter"
    },
    createProductOnEnter: function(e) {
        if(e.which != 13 || !this.input.val().trim() ) {
            return
        }
        console.log(this.newAttributes());
        app.productList.create(this.newAttributes());
        this.input.val('');
    },
    addOne: function(product) {
        var view = new app.ProductView({model: product});
        $("#product-list").append(view.render().el);
    },
    addAll: function() {
        console.log(app.productList.length)
        this.$("#product-list").html("");
        app.productList.each(this.addOne, this);
    },
    newAttributes: function() {
        return {
            name: this.input.val().trim(),
            completed: false
        }
    }
});
app.appView = new app.AppView();
