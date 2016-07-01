var app=angular.module("dateTime",[]);

app.run(function($rootScope){
    console.log("Application is reday for work");
    $rootScope.data={};
    //2:58:AM
    date=new Date("1969-12-31T21:28:00.000Z");

    var customDate={
        init: function(){
        //call module function
        this.module();
        },
        module: function(){
            //call function
            this.getFullDate();
        },
          getDate: function(date)
          {
            //define global variables
          var day=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          var  month=['January','February','March','April','May','June','July','August','September','October','November','December'];
            if(date instanceof Date && !isNaN(date.valueOf()))
            {
            var date=new Date(date);
            var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
            var jsonDate={};
            //push full date
            jsonDate['fullDate']=day[date.getDay()] + ' '+ month[date.getMonth()] + ' ' + date.getDate() +',' +date.getFullYear();
            //push short date
            jsonDate['shortDate']=month[date.getMonth()] + ' ' + date.getDate() +',' +date.getFullYear();
            //push year
            jsonDate['year']=date.getFullYear();
            jsonDate['month']=[date.getMonth()+1,month[date.getMonth()] ];
            jsonDate['day']=[date.getDay(),day[date.getDay()]];

           jsonDate['timeFull']=date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" " + ampm;
           jsonDate['time']=[date.getHours(),date.getMinutes(),date.getSeconds(),ampm]

          return jsonDate;

            }
            else {
              console.log("Invalid date supply");
            }
          }

    }
  //  date.init();
    var newDate=customDate.getDate(date);
    console.log(JSON.stringify(newDate));

});
