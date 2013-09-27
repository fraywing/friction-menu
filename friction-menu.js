/*
 *Friction Menu
 *Author: Austin Anderson
 *License MIT
 *Description:
 *Just what the doctor ordered, a friction menu for Angular. You heard me.
 *
 *friction-menu-opts or frictionMenuOpts has to exists in the scope somewhere, either as an attribute or in a controller.
 *
 *use like:
 *<div friction-menu friction-menu-opts={JSON STUFF}></div>
 *
 *watch ARRAY paths to match when to show the menu.  i,e watch : ["/posts/"]
 *defaultVisible BOOLEAN Whether or no to show of collapse the friction menu on load
 *showWhenScrolledTo BOOL OR STRING if you put a pixel amount (i,e 300px) the menu wont appear until you scroll to that point, false for disabled
 *
 *TODO:
 *	1. Add more options
 *	2. Remove jQuery
 *	3. Put some candy out to trap the neighbor's dog
 */

var frictionMenu = angular.module('friction-menu', []);

frictionMenu.directive('frictionMenu', function($location,$timeout){
    var methods = {
	    slideDown :function(currentTop,menuHeight,el){
		el.css('top',0+'px');
		el.removeClass("friction-disabled");
		return currentTop; 
	    },
	    slideUp : function(currentTop,menuHeight,el){
		el.css('top',~menuHeight+'px');
		el.addClass("friction-disabled");
		return currentTop; 
	    },
	    forceSlide : function(currentTop,menuHeight,el){
		  el.css('top',~menuHeight+'px');
	    }
	    
	};
	return {
	    scope : {
		frictionMenuOpts : "@",
		frictionOff : "@",
		$routeChangeStart : "@"
		},
	    link : function(scope,el,attr){
		fo = angular.fromJson(scope.frictionMenuOpts),
		wl = angular.isDefined(fo.watch) ? fo.watch : [],
		dv = angular.isDefined(fo.defaultVisibile) &&  fo.defaultVisibile == false ? "none" : "block",
		ws = angular.isDefined(fo.showWhenScrolledTo) && fo.showWhenScrolledTo ? fo.showWhenScrolledTo.split('px')[0] : false;
		$(el).css({"transition" :  "all 0.2s linear 0s", "-webkit-transition" : "all 0.2s linear 0s", "-moz-transition" : "all 0.2s linear 0s"});
		scope.$on('$routeChangeStart', function(n,o){
		
		    var menuHeight = $(el).outerHeight();
			el.css({'display' : dv});
			for (x in wl) {
			    var escapedQuery = wl[x].replace(/\//g, "\\/"),
			    escapedPath =  $location.path();
			    var pattern = new RegExp(escapedQuery,'g');
			    if (pattern.test(escapedPath)){
	
				var position = $(window).scrollTop();
				var currentTop = dv == "block" ? 0 : ~menuHeight;
				
				if (currentTop == 0) $(el).css('top',"0px");
				
				    $(window).scroll(function() {
					var winHeight = $(window).height();
					var scroll = $(window).scrollTop();
					
					if (ws) {
					    //don't show until we scroll a certain amount
					    if (scroll < ws) {
						 methods.forceSlide(currentTop,menuHeight,el,function(){
						     el.css('display','none')
							    });
					    }else if(scroll > ws){
						 el.css('display','block');
					
					  
					    if(scroll > position) {
						//down
						currentTop = methods.slideUp(currentTop,menuHeight,el);
					    } else {
						//up
						currentTop = methods.slideDown(currentTop,menuHeight,el)
						    
					    }
					    position = scroll;
					    }
					}else{
					   el.css('display','block');
					   console.log(currentTop);
					    console.log(currentTop);
					    if(scroll > position) {
						//down
						currentTop = methods.slideUp(currentTop,menuHeight,el);
					    } else {
						//up
						currentTop = methods.slideDown(currentTop,menuHeight,el)
						    
					    }
					    position = scroll;
					    }
				    });
						    
			    }else{
				$(window).unbind('scroll');
				el[0].style.display = "none";
				el.addClass("friction-disabled");
			    }
			}
		   
		    });

	    }
	    
	}
    
    });