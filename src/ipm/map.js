
var personCoords = { 'Afonso': [1200, 500], 'Ana': [1100, 400], 'Andre': [1500, 1000], 'Beltrano': [634, 110],
                     'Catarina': [700, 400], 'Manuel': [1700, 900]};

    $(function(){
       
        var color = {
            'sea_bg': '#019dd8', 
            'sea_bg2': '#019dd8', 
            'green_bg': '#8fb24a',
            'green2_bg': '#8fb24a',
            'green3_bg': '#8fb24a',
            'green4_bg': '#8fb24a',
            'green_land': '#c1d67b',
            'green2_land': '#c1d67b',
            'gray_land': '#a4afb5',
            'brown_land': '#c4a139',  
            'ponte': '#7e6230',
            'ponte2': '#7e6230'
        };    
        
        var otherRegions = ['sea_bg', 'sea_bg2', 'green_bg', 'green2_bg', 'green3_bg', 'green4_bg', 'green_land', 'green2_land', 'gray_land', 'brown_land', 'ponte', 'ponte2'];
        
        map = new jvm.Map({
            
            map: 'map',
            zoomButtons: false,
            zoomMin: 2.5,
            zoomMax: 9,
            zoomStep: 1.3,
            regionsSelectable: true,
            regionsSelectableOne: true,
            backgroundColor: "#1E1D1F",
            
            markerStyle: {

                hover: {
                    stroke: '#505050',
                    "stroke-width": 1,
                    "stroke-opacity": 1,
                    r: 5
                },
           
            },
            
            regionStyle: {
                initial: {
                    fill: 'white',
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  hover: {
                    "fill-opacity": 1,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 1
                  },
                  selected: {
                    fill: '#dbdbdb'
                  },
            },
            
            markerLabelStyle: {
                initial: {
                    "visibility": 'hidden'
                },
                
                hover: {
                    "visibility": 'hidden'
                },
                    
                selected: {
                    "visibility": 'hidden'
                },
            },
            
            regionLabelStyle: {
                initial: {
                    "visibility": 'hidden'
                },
                
                hover: {
                    "visibility": 'hidden'
                },
                    
                selected: {
                    "font-family": 'sans-serif',
                    "font-size": '7pt',
                    "visibility": 'visible',
                    fill: 'black'
                },
            },

            markers: [{
              coords: [1200, 500],
              name: 'Afonso',
              style: {fill: 'gray'}
            },{
              coords: [1100, 400],
              name: 'Ana',
              style: {fill: '#ffd700'}
            },{
              coords: [1500, 1000],
              name: 'Andre',
              style: {fill: '#ea3546'}
            },{
              coords: [634, 110],
              name: 'Beltrano',
              style: {fill: '#662e9b'}
            },{
              coords: [700, 400],
              name: 'Catarina',
              style: {fill: '#43bccd'}
            },{
              coords: [1700, 900],
              name: 'Manuel',
              style: {fill: '#fff1d0'}
            }],
            
            labels: {
              regions: {
                render: function(code){
                    switch (code) {
                        case 'sea_bg':
                        case 'sea_bg2': 
                        case 'green_bg':
                        case 'green2_bg':
                        case 'green3_bg':
                        case 'green4_bg':
                        case 'green_land':
                        case 'green2_land':
                        case 'gray_land':
                        case 'brown_land': 
                        case 'ponte':
                        case 'ponte2':
                            return '';
                            break;
                        case 'info':
                            return 'Informacoes';
                            break;
                        case 'perdidos':
                            return 'Perdidos e Achados';
                            break;
                        case 'palco1':
                            return 'Palco 1';
                            break;
                        case 'palco2':
                            return 'Palco 2';
                            break;
                        case 'palco3':
                            return 'Palco 3';
                            break;
                        case 'wc':
                            return 'WC 1';
                            break;
                        case 'wc2':
                            return 'WC 2';
                            break;
                        case 'sos':
                            return 'Primeiros Socorros';
                            break;
                        case 'bar':
                            return 'Bar';
                            break;
                        case 'sbar':
                            return 'Senhas Bar';
                            break;
                        case 'comida':
                            return 'Barraca de Comida';
                            break;
                        case 'scomida':
                            return 'Senhas Comida';
                            break;  
                        case 'vip':
                            return 'Zona VIP';
                            break;
                        case 'bilheteira':
                            return 'Bilheteira';
                            break;
                        case 'merch':
                            return 'Merchandise';
                            break;
                        default:
                            return code;
                    }
                }
              }
            },
            
            onRegionSelected: function (event, code, region) {
                if ((otherRegions.indexOf(code) != -1)) {
                    console.log("PREVENT: "+code);
                    if(map.regions[code].element.isSelected) {
                        console.log("Auto-deselecting: " + code);

                        var o = {};
                        o[code] = false;

                        map.setSelectedRegions(o);
                    }
                }
            },
            
            onRegionClick: function (event, code) {
                if(map.regions[code].element.isSelected) {
                    console.log("Deselecting: " + code);
                    map.clearSelectedRegions();
                }
            },
            
            onRegionTipShow: function(e, el, code){
                e.preventDefault();
            },
            onMarkerTipShow: function(e, el, code){
                e.preventDefault();
            },

            container: $('#map'),
            series: {
              regions: [{
                attribute: 'fill'
              }]
            }
        });

    map.series.regions[0].setValues(color);
    //map.setFocus({scale: 5, x: 0.8, y: 0.8});
    
    });

