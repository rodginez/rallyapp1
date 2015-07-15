Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    launch: function() {
      console.log("First Rally app");
      console.log("what is this=", this.__proto__.$className)
      var rallyApp = this;
      var myStore1 = Ext.create('Rally.data.wsapi.Store', {
          model: 'User Story',
          autoLoad: true,
          listeners: {
              load: function(myStore, myData, success) {
                  console.log('Data read!', myStore, myData, success);

                  var myGrid = Ext.create('Rally.ui.grid.Grid', {
                    store: myStore,
                    enableHierarchy: true,
                    columnCfgs: ['FormattedID', 'Name', 'Description', 'PlanEstimate', 'ScheduleState']
                  });

                  console.log('My Grid', myGrid);
                  //This only works in conjunction with the scope: this instruction
                  //this.add(myGrid);
                  //This is muuuch better
                  rallyApp.add(myGrid);
                  //Trick: Always add this line so you know the current context object
                  console.log('what is this=', this.__proto__.$className)
              },
              //Trick: this is set during store creation, so the current this is the app.
              //If you forget this, the this.add(myGrid) will refer to the store - context
              //is switched after the store is created
              //The other, cleaner way to do it is to create a variable that references the app
              //at the time of creation - the example
              //scope: this
          },
          fetch: ['FormattedID', 'Name', 'Description','PlanEstimate', 'ScheduleState']
      });
    }
});
