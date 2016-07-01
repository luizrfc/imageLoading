var app=angular.module('lazyimage',[]);
app.run(function($log,$rootScope){
  $log.info("Working..");
});
app.controller("home", function($scope){
  $scope.img="http://www.hdwallpapers.in/walls/autumn_bench-HD.jpg";
  $scope.imageList=[
    {"image":"//c1.staticflickr.com/8/7300/27955167376_2e4b52aa2d_n.jpg","text":"Image Caption 1"},
    {"image":"//newevolutiondesigns.com/images/freebies/tropical-beach-background-preview-2.jpg","text":"Image Caption 2"},
    {"image":"//www.planwallpaper.com/static/images/Nature-Beach-Scenery-Wallpaper-HD.jpg","text":"Image Caption 3"},
    {"image":"http://www.hdwallpapers.in/walls/autumn_bench-HD.jpg","text":"Image Caption 4"}
  ]
})
app.directive("imageOnLoad", function () {
   return {
     restrict:"A",
     scope:true,
      replace: true,
     controller:"imageOnLoad",
     controllerAs:"ctrl",
     bindToController:{
       image: '@',
       errorMessage:'@'
     },
      templateUrl:'imageLoaderTemplate.html' /*,
      link: function(element, ctrl, scope,attrs){
        //  scope.loaded=true;
          //scope.$apply();
      }*/
   }
 }).controller("imageOnLoad",function($scope,$window, $element,$document,$rootScope){
     var that=this;
     $scope.imageOnLoad=function(){
       $element.find('img')[0].src=that.image;
       that.isError=false;
          $scope.$apply()
     }
     $element.find('img').bind('load', function(){
          that.isLoaded=true;
          $scope.$apply();
     })
     $element.find('img').bind('error', function(){
          that.isError=true;
          $scope.$apply();
     })

     angular.element($window).bind('load', function() {
        $scope.imageOnLoad();

     });

     that.reloadThisImage=function(){
       if(that.image!=""){
        $scope.imageOnLoad();
         }
     }

 }).run(function($templateCache){
     $templateCache.put("imageLoaderTemplate.html","<div class=\"imageViwer\"><img  ng-hide=\"ctrl.isError\" ng-src=\"{{ctrl.imageSrc}}\"/> <div class=\"loader\" ng-hide=\"ctrl.isLoaded || ctrl.isError\" ></div><div class=\"imageErorrOnLoad\" ng-show=\"ctrl.isError\"><p>{{ctrl.errorMessage}}</p><a ng-click=\"ctrl.reloadThisImage()\"> Reload </a></div></div>")
 });
/*
app.directive("imageOnLoad", [function ($window) {
   return {
       restrict: "AE",
       replace: true,
      // transclude:true,
       scope:
       {
         image: '@',
         loaded:'=isLoaded',
         error:'=isError',
         fnError:"&"
       },

       template:'<img  ng-hide="{{isError}}" /> ',
       link: function (scope, element, attrs) {
        scope.loadImage=function()
        {
          element[0].src=scope.image;
        }

          window.onload = scope.loadImage();
            element.bind('load', function(e){
            scope.loaded=true;
            scope.$apply();
         });
         element.bind('error', function(e){
            scope.error=true;
            element[0].src='';

         });

       }
   };
}]);

/*
app.directive("ngImageonload", function($parse){
    return {
      restrict :"AE",

      scope:
      {
        image: '@',
        error:'@'
        //loaded:"="
      },
      replace:true,
      template:'<img ng-src="{{image}}"  ng-hide="{{error}}" />',
      link: function(scope, element, attrs){

            element.bind('load', function(e){

                scope[attrs.loaded1]="kfddfhddhdfd";
                 scope.$apply()
                //scope.$apply(function(){
                    //scope.loaded=true;
              //  });

              });

/*
                element.bind('error', function(e)
                {
                  scope.$apply(function(){
                  scope.isLoaded=false;
                  scope.isLoadedError=true;
                  scope.errMessage=attrs.error;
                })
                scope.reloadImage=function(image){
                      scope.$apply(function(){
                        var img=
                        scope.attrs.ngSrc=image;
                      });
                }

              })

                }
    }
})
*/
