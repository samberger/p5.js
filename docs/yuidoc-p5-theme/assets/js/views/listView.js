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
      var self = this;
      this.listTpl = _.template(listTpl);
      this.listItemTpl = _.template(listItemTpl);


      // Start events
      $(document).on('click', '#sort-ab', function() {
        var $list = self.$el.find('#collection-list');
        $list.find('li').sort(self.sortAZ).appendTo($list);
      });

      return this;
    },
    /**
     * Render the list.
     */
    render: function(items, listCollection) {
      if (items && listCollection) {
        var self = this;

        // Render the html for the <li> items
        var listItemsHtml = "";
        _.each(items, function(item, i) {
          var isClass = listCollection === 'classes';
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
          'title': self.capitalizeFirst(listCollection),
          'listItems': listItemsHtml,
          'listCollection': listCollection
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
    },
    /**
     * Sort function (for the Array.prototype.sort() native method): from A to Z.
     * @param {string} a
     * @param {string} b
     * @returns {Array} Returns an array with elements sorted from A to Z.
     */
    sortAZ: function(a, b) {
      return a.innerHTML.toLowerCase() > b.innerHTML.toLowerCase() ? 1 : -1;
    }

  });

  return listView;

});