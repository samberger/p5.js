define([
  'underscore',
  'backbone',
  'App',
  // Templates
  'text!tpl/listItem.html',
  'text!tpl/list.html'
], function(_, Backbone, App, listItemTpl, listTpl) {

  var listView = Backbone.View.extend({
    el: '#list',
    events: {
    },
    /**
     * Init.
     */
    init: function() {
      this.listTpl = _.template(listTpl);
      this.listItemTpl = _.template(listItemTpl);

      return this;
    },
    /**
     * Render the list.
     */
    render: function(items, listGroup) {
      if (items && listGroup) {
        var self = this;

        // Render the html for the <li> items
        var listItemsHtml = "";
        _.each(items, function(item, i) {
          var isClass = listGroup === 'classes';
          var item = items[i];
          var name = item.name;
          var hash = '#get/';
          if (isClass) {
            hash += name;
          } else {
            hash += item.class + '/' + name;
          }
          listItemsHtml += self.listItemTpl({
            'name': item.name,
            'hash': hash
          });
        });

        // Put the <li> items html into the list <ul>
        var listHtml = self.listTpl({
          'title': self.capitalizeFirst(listGroup),
          'listItems': listItemsHtml,
          'listGroup': listGroup
        });

        // Render the view
        this.$el.html(listHtml);
      }

      return this;
    },
    /**
     * Show a list of items.
     * @param {array} items Array of item objects.
     * @returns {object} This view.
     */
    show: function(listGroup) {
      if (App[listGroup])
        this.render(App[listGroup], listGroup);

      App.pageView.hideContentViews();

      this.$el.show();

      return this;
    },
    /**
     * Helper method to capitalize the first letter of a string
     * @param {string} str 
     * @returns {string} Returns the string.
     */
    capitalizeFirst: function(str) {
      return str.substr(0, 1).toUpperCase() + str.substr(1);
    }

  });

  return listView;

});