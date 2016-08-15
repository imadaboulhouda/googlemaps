(function($){
    $.fn.googleMap = function(options){
      var settings = {
          
          show:'',
          latitude:'51.508742',
          longtitude:'-0.120850',
          selectLat:'',
          selectLongt:'',
          selectAdress:'',
          modal:false,
          modalSelector:'',
          
      };
        var settings = $.extend({},settings,options);
        //AJouter le js 
        
        //console.log(settings);
        //function
        var myCenter= new google.maps.LatLng(settings.latitude,settings.longtitude),map="";
        function initialize() {
          var mapProp = {
            center:myCenter,
            zoom:12,
            mapTypeId:google.maps.MapTypeId.ROADMAP
          };
           map=new google.maps.Map(document.getElementById(settings.show),mapProp);
            
            addMarker($(settings.selectAdress),myCenter,map,settings.selectLat,settings.selectLongt);
      
        }
        
        google.maps.event.addDomListener(window, 'load', initialize);
              if(settings.modal)
            {
            	$(document).find(settings.modalSelector).on('shown.bs.modal',function(){
            		google.maps.event.trigger(map, 'resize');
            	});
            }
            initialize();
        $(settings.selectAdress).keyup( function(e) {
           
              GMaps.geocode({
                address: $(this).val().trim(),
                callback: function(results, status) {
                  if (status == 'OK') {
                      var marker = [];
                      for (var i = 0; i < marker.length; i++) {
                        marker[i].setMap(null);
                      }
                      var latlng = results[0].geometry.location;
                      var myCenter= new google.maps.LatLng(latlng.lat(),latlng.lng());
                       var mapProp = {
                        center:myCenter,
                        zoom:12,
                        mapTypeId:google.maps.MapTypeId.ROADMAP
                      };
            map=new google.maps.Map(document.getElementById(settings.show),mapProp);

                    
                   
                      document.getElementById(settings.selectLat).value = latlng.lat();
                      document.getElementById(settings.selectLongt).value = latlng.lng();
                      
                        marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                        zoom:12,
                        draggable:true
                        });
                      
                       marker.addListener('drag',function(event) {
                        document.getElementById(settings.selectLat).value = event.latLng.lat();
                        document.getElementById(settings.selectLongt).value = event.latLng.lng();
                        Adresse($(settings.selectAdress),event.latLng.lat(),event.latLng.lng());
                    });

                    marker.addListener('dragend',function(event) {
                        document.getElementById(settings.selectLat).value = event.latLng.lat();
                        document.getElementById(settings.selectLongt).value = event.latLng.lng();
                        Adresse($(settings.selectAdress),event.latLng.lat(),event.latLng.lng());
                    });
                      
                  }
                }
              });
    });
        
    };
    function addMarker(show,latlng,map,latitude,longtitude){
           var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                zoom:12,
                draggable:true
        });

        marker.addListener('drag',function(event) {
            document.getElementById(latitude).value = event.latLng.lat();
            document.getElementById(longtitude).value = event.latLng.lng();
            Adresse(show,event.latLng.lat(),event.latLng.lng());
        });

        marker.addListener('dragend',function(event) {
            document.getElementById(latitude).value = event.latLng.lat();
            document.getElementById(longtitude).value = event.latLng.lng();
            Adresse(show,event.latLng.lat(),event.latLng.lng());
        });
    };
    
    function Adresse(show,lat,long)
    {
        var lien = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&sensor=true";
        $.getJSON(lien,function(data){
             //console.log(lien);
        var adress = data.results[0].formatted_address;
        console.log(show);
      	//console.log(show);
    
           show.val(adress);
        });
    };
    
    
   
    
    
    
    
    
})(jQuery);