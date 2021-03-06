define(function(require) {
  'use strict';

  var CoreData = require('backend/CoreData');
  var TabManager = require('modules/TabManager');
  var YoutubeSearcher = require('backend/YoutubeSearcher');
  var React = require('react');

  var SearchbarContainer = React.createClass({
    getInitialState: function() {
      return {
        keyword: ''
      };
    },

    _onSubmit: function(event) {
      event.preventDefault();
      // Start to search
      var keyword = this.state.keyword;
      if (keyword) {
        YoutubeSearcher.search(keyword, 30).then(function(results) {
          CoreData.set('searchResults', results);
          TabManager.setTab('search');
        }, function() {
          // show error
        });
      }
    },

    _onInputChange: function(event) {
      this.setState({
        keyword: event.target.value
      });
    },

    render: function() {
      /* jshint ignore:start */
      return (
        <div className="searchbar-container">
          <form
            className="form-inline"
            onSubmit={this._onSubmit}>
              <div className="form-group">
                <input
                  tabIndex="1"
                  className="searchbar-user-input form-control"
                  onChange={this._onInputChange}
                  placeholder="Find something ..."/>
              </div>
          </form>
        </div>
      );
      /* jshint ignore:end */
    }
  });

  return SearchbarContainer;
});
