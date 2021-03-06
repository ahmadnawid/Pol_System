/**
 * Created by wakhan on 1/25/2017.
 */
$(function () {

    globalOptions = {
        chart: {
            renderTo:'',
            type: ''
        },
        exporting: {
            sourceWidth: 800,
            sourceHeight:450,
            buttons: {
                contextButton: {
                    menuItems: [ {
                        text: 'Print Chart',
                        onclick: function () {
                            this.print({
                            });
                        }

                    }, {
                        text: 'Export as Image',
                        onclick: function () {
                            var title = this.title.textStr;
                            this.exportChart({
                                type: 'image/jpeg',
                                filename: title,

                            });
                        }
                    }, {
                        text: 'Export as PDF',
                        onclick: function () {
                            var title = this.title.textStr;
                            this.exportChart({
                                type: 'application/pdf',
                                filename: title,

                            });
                        },

                    }]
                }
            },
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Total Remaining Children'
            }
        },
        colors: ['#FF0000', '#C99900', '#FFFF00'],
        series:[{}]
    };

    /*
    Loading and generating charts

    generateColumnChart({apiUrl:'api_get_admin_data_last',
                         renderTo:'cont_reg_trend_last_camp',
                         menu:[{chart:'normal', title:'Stack Chart'},
                               {chart:'percent', title:'Stack Percent'},
                               {chart: '', title:'Back to Normal'}],
                         stacking:'',
                         combination:[{type:'pie', method:'sum'},
                                      {type:'spline', method:'average',
                                       colors:Highcharts.getOptions().colors[3]}],
                         label:{title:'Total Remaining Children',
                                position:{top:'18px', left:'250px'}}});
    */

    //console.log(globalOptions.exporting.buttons.contextButton.menuItems);

    var chart1 = {apiUrl:'api_get_admin_data_by_campaign_indicator',
        urlParams: {campaign:0, indicator:'remaining'},
        renderTo:'cont_reg_trend_last_camp',
        menu:[{chart:'normal', title:'Stack Chart'},
            {chart: '', title:'Back to Normal'}],
        stacking:'',
        combination:[{type:'pie', method:'sum'}],
        label:{title:'Total Remaining Children',
            position:{top:'18px', left:'170px'}}};
    columnChart(chart1);

    var chart2 = {apiUrl:'api_get_admin_data_by_campaign_indicator',
        urlParams: {campaign:13, indicator:'vaccinated'},
        renderTo:'cont_reg_trend_vacc_child_last_camp',
        menu:[{chart:'normal', title:'Stack Chart'},
            {chart: '', title:'Back to Normal'}],
        stacking:'',
        yAxisTitle : 'Total Vaccinated Children',
        colors:['#3DE2FF', '#048AFF'],
        combination:[{type:'spline', method:'sum'}]};
    columnChart(chart2);

    var chart3 = {apiUrl:'api_get_admin_data_by_campaign_indicator',
                    urlParams: {campaign:13, indicator:'vaccines'},
                    renderTo:'cont_reg_trend_vacc_usage_last_camp',
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        vAlign: 'top',
                        x: 80,
                        y: 55,
                        color: '#FFFFFF'
                    },
                    yAxises: [

                        {
                            format:'',
                            color:'#43AB0D',
                            opposite: true,
                            title:'Used Vaccine',
                            indicator:'Used Vials',
                            type: 'spline',
                            tooltip: '',
                            marker: true,

                        },
                        {
                            format:'',
                            color:'#048aff',
                            opposite: false,
                            title:'Received Vaccine',
                            indicator:'Received Vials',
                            type: 'column',
                            tooltip: '',
                            yAxis: 1,
                            lineWidth: 1
                        },
                        {
                            format:' %',
                            color:'#F00000',
                            opposite: true,
                            title:'Wastage Percentage',
                            indicator:'Vaccine Wastage',
                            yAxis: 2,
                            type: 'spline',
                            tooltip: ' %',
                            marker: false,
                            lineWidth: 0
                        },


                    ]
                };
    multiAxisColumnChart(chart3);

    var chart4 = {apiUrl:'api_get_admin_data_by_indicator',
        urlParams: {indicator:'vaccines'},
        renderTo:'container2',
        type: 'line',
        legend: {
            layout: 'horizontal',
            align: 'center',
            vAlign: 'bottom',
            floating: false,
        },
        yAxisTitle:'Vaccine Usage Last 3 Campaigns'

        };
    lineChart(chart4);

    var last3CampRemChildColumnChart = {apiUrl:'api_get_admin_data_by_indicator',
        urlParams: {indicator:'vaccinated'},
        renderTo:'cont_reg_trend_rem_child_last_3camp',
        menu:[{chart:'', title:'Stack Column Chart'},
            {chart: 'normal', title:'Back to Normal'}],
        stacking:'normal',
        yAxisTitle:'Vaccinated Children',
        colors:['#3DE2FF', '#048AFF'],
        legend: {align:'right', vAlign:'top', x:-30, y:5, floating:true}
        };
    columnChart(last3CampRemChildColumnChart);

    //console.log(globalOptions.exporting.buttons.contextButton.menuItems);
    var pieChartRefusal = {
        apiUrl:'api_get_admin_data_by_object',
        postData: {substitute:'Remaining Refusal', indicator:'d_remainingRefusal', cat:'d_region', campaignId:13},
        renderTo:'cont_refusal',
        type:'pie',
        plotOptions: { pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled:false
            },
            showInLegend: true
        }}
    };

    pieChart(pieChartRefusal);

});


/*
this function generates any chart with combination charts as well.
 */
function pieChart(settings) {
    // /*
    // deep cloning the settings and global objects, otherwise it will messed up
    //  */
    var settings = jQuery.extend(true, {}, settings);
    var options = jQuery.extend(true, {}, globalOptions);

    // set the element where the chart should be rendered
    options.chart.renderTo = settings.renderTo;

    // set the type of chart, in case the type was not half pie chart
    if(!settings.hasOwnProperty('halfPie'))
        options.chart.type = settings.type;
    // else if (settings.hasOwnProperty('halfPie')) {
    //
    // }

    // set the plat option, should be sent as an object
    /*
    pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
         enabled: false
         },
         showInLegend: true
    }
     */
    options['plotOptions'] = settings.plotOptions;

    // check and set the menu options
    var menus = settings.menu;
    if(settings.hasOwnProperty('menu')) {
        for(var i = 0; i < menus.length; i++) {
            var menuItem = myMenuItems('', menus[i].chart, settings.renderTo, menus[i].title);
            options.exporting.buttons.contextButton.menuItems.push(menuItem);
            menuItem = null;
        }
    }

    // adding data label toggle menu option
    var labelMenu = dataLabelToggleMenu(settings.renderTo);
    options.exporting.buttons.contextButton.menuItems.push(labelMenu);

    // check for color property
    delete options.colors;
    if(settings.hasOwnProperty('colors'))
        options['colors'] = settings.colors;

    // var options = {
    //     chart: {
    //         renderTo:settings.renderTo,
    //         plotBackgroundColor: null,
    //         plotBorderWidth: null,
    //         plotShadow: false,
    //         type: 'pie'
    //     },
    //     title: {
    //         text: 'Browser market shares January, 2015 to May, 2015'
    //     },
    //     tooltip: {
    //         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    //     },
    //     plotOptions: {
    //         pie: {
    //             allowPointSelect: true,
    //             cursor: 'pointer',
    //             dataLabels: {
    //                 enabled: false
    //             },
    //             showInLegend: true
    //         }
    //     },
    //     series: []
    // };

    $.ajax({
        url: Routing.generate(settings.apiUrl),
        type: 'POST',
        data: JSON.stringify(settings.postData),
        dataType: "JSON",
        beforeSend: function () {
            // ajax loader path is in the data attribute of the main div
            var path = $("#main").data('ajax-loader');
            $('#'+settings.renderTo).html("<img src='"+path+"' class='ajax-loader'>");
        },
        success: function(data) {
            $('#' + settings.renderTo).html('');
            var obj = data;
            // set the dynamic title
            options.title = {text:obj.title};
            // set the dynamic categories
            //options.xAxis.categories = obj.categories;
            // set the data/series
            options.series = obj.series;
            console.log(obj.series);
            // finally create chart
            var chart = new Highcharts.Chart(options);
        },
        cache: false
    });


}

/*
 this function generates column chart with combination charts as well.
 */
function multiAxisColumnChart(settings) {
    /*
     deep cloning the settings and global objects, otherwise it will messed up
     */
    var settings = jQuery.extend(true, {}, settings);
    var options = jQuery.extend(true, {}, globalOptions);

    // set the element where the chart should be rendered
    options.chart.renderTo = settings.renderTo;

    options.chart['zoomType'] = 'xy';

    // check and set the menu options
    var menus = settings.menu;
    if(settings.hasOwnProperty('menu')) {
        for(var i = 0; i < menus.length; i++) {
            var menuItem = myMenuItems('', menus[i].chart, settings.renderTo, menus[i].title);
            options.exporting.buttons.contextButton.menuItems.push(menuItem);
            menuItem = null;
        }
    }

    // adding data label toggle menu option
    var labelMenu = dataLabelToggleMenu(settings.renderTo);
    options.exporting.buttons.contextButton.menuItems.push(labelMenu);


    // the tooltip are shared for now
    options['tooltip'] = {shared:true};

    // check for the legend settings
    /*
     legend = {
     layout: 'text',
     align: 'text',
     vAlign: 'text',
     x: int,
     y: int,
     color: 'color'
     }
     */
    if(settings.hasOwnProperty('legend')) {
        //console.log("we are here in the legend");
        options['legend'] = {
            layout:settings.legend.layout,
            align:settings.legend.align,
            verticalAlign:settings.legend.vAlign,
            x:settings.legend.x,
            y:settings.legend.y,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'

        }
    }

    // check for the yAxises, should be set as plural
    /*
     yAxises = {
     format:'text',
     color:'color',
     opposite:'boolean',
     title:'text',
     indicator:'text',
     yAxis:number (1, 2),
     type: 'text',
     tooltip: 'suffix',
     marker: 'boolean'

     }
     */
    if(settings.hasOwnProperty('yAxises')) {
        var yAxises = settings.yAxises;
        var axis = [];
        for(var i = 0; i<yAxises.length; i++) {
            var tmpAxis = {
                labels: {
                    format: '{value}'+yAxises[i].format,
                    style: {color:yAxises[i].color}
                },
                title: {
                    text:yAxises[i].title,
                    style:{color:yAxises[i].color}
                },
                opposite:yAxises[i].opposite,
                gridLineWidth: yAxises[i].lineWidth,

            }
            axis.push(tmpAxis);
        }
        options['yAxis'] = axis;
    }

    $.ajax({
        url: Routing.generate(settings.apiUrl, settings.urlParams),
        beforeSend: function () {
            // ajax loader path is in the data attribute of the main div
            var path = $("#main").data('ajax-loader');
            $('#'+settings.renderTo).html("<img src='"+path+"' class='ajax-loader'>");
        },
        success: function(data) {
            $('#' + settings.renderTo).html('');
            var obj = JSON.parse(data);
            // set the dynamic title
            options['title'] = {text:obj.title};
            // set the dynamic categories
            options.xAxis.categories = obj.categories;
            // set the data/series
            var dataSeries = obj.series;
            //console.log('We are here above the if');
            if(settings.hasOwnProperty('yAxises')) {
                //console.log('We are here in the right location');
                var newSeries = settings.yAxises;

                var series = [];
                for(var i = 0; i<newSeries.length; i++) {

                    for(var x = 0; x < dataSeries.length; x++) {
                        if(dataSeries[x].name == newSeries[i].indicator) {
                            var tempSeries = {};
                            tempSeries['name'] = dataSeries[x].name;
                            tempSeries['type'] = newSeries[i].type;
                            tempSeries['data'] = dataSeries[x].data;
                            tempSeries['yAxis'] = newSeries[i].yAxis;
                            tempSeries['tooltip'] = {valueSuffix:newSeries[i].tooltip}
                            tempSeries['color'] = newSeries[i].color;
                            series.push(tempSeries);
                        }
                    }

                }
                options.series = series;
            }

            //console.log(options);
            var chart = new Highcharts.Chart(options);
        },
        cache: false
    });


}

/*
 this function generates column chart with combination charts as well.
 */
function columnChart(settings) {
    /*
     deep cloning the settings and global objects, otherwise it will messed up
     */
    var settings = jQuery.extend(true, {}, settings);
    var options = jQuery.extend(true, {}, globalOptions);

    // set the element where the chart should be rendered
    options.chart.renderTo = settings.renderTo;

    // set the type of chart, static in this case
    options.chart.type = 'column';

    // set the plat option, empty, normal, percent
    options['plotOptions'] = {column:{stacking:settings.stacking}};

    if(settings.hasOwnProperty('yAxisTitle'))
        options.yAxis.title.text = settings.yAxisTitle;

    // check and set the menu options
    var menus = settings.menu;
    if(settings.hasOwnProperty('menu')) {
        for(var i = 0; i < menus.length; i++) {
            var menuItem = myMenuItems('', menus[i].chart, settings.renderTo, menus[i].title);
            options.exporting.buttons.contextButton.menuItems.push(menuItem);
            menuItem = null;
        }
    }

    // adding data label toggle menu option
    var labelMenu = dataLabelToggleMenu(settings.renderTo);
    options.exporting.buttons.contextButton.menuItems.push(labelMenu);

    // check for color property
    if(settings.hasOwnProperty('colors'))
        options.colors = settings.colors;

    //check for label
    if(settings.hasOwnProperty('label')) {
        options['labels'] = {
            items: [{
                html: settings.label.title,
                style: {
                    left: settings.label.position.left,
                    top: settings.label.position.top,
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        }
    }

    // check if there was legned information
    /*
    legend: {
        align: (left, right, center)
        vAlign: (top, bottom, middle)
        x: (pixels in integer)
        y: (pixels in integer)
        floating: (true|false)

    }
     */
    if(settings.hasOwnProperty('legend')) {
        options['legend'] = {
            align: settings.legend.align,
            verticalAlign: settings.legend.vAlign,
            x: settings.legend.x,
            y: settings.legend.y,
            floating:settings.legend.floating,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: (settings.legend.vAlign=='top')?1:0,
            shadow: false
        }
    }

    $.ajax({
        url: Routing.generate(settings.apiUrl, settings.urlParams),
        beforeSend: function () {
            // ajax loader path is in the data attribute of the main div
            var path = $("#main").data('ajax-loader');
            $('#'+settings.renderTo).html("<img src='"+path+"' class='ajax-loader'>");
        },
        success: function(data) {
            $('#' + settings.renderTo).html('');
            var obj = JSON.parse(data);
            // set the dynamic title
            options['title'] = {text:obj.title};
            // set the dynamic categories
            options.xAxis.categories = obj.categories;
            // set the data/series
            options.series = obj.series;

            // check for the combined chart request
            if(settings.hasOwnProperty('combination')) {
                var secondCharts = settings.combination;
                for(var i = 0; i < secondCharts.length; i++) {
                    var colors = options.colors;
                    if(secondCharts.hasOwnProperty('colors')) {
                        colors = secondCharts.colors;
                    }
                    var newSettings = secondChart(data, secondCharts[i], colors);
                    options.series.push(newSettings);
                }
            }
            // finally create chart
            var chart = new Highcharts.Chart(options);
        },
        cache: false
    });


}

/*
 this function generates any chart with combination charts as well.
 */
function lineChart(settings) {
    /*
     deep cloning the settings and global objects, otherwise it will messed up
     */
    var settings = jQuery.extend(true, {}, settings);
    var options = jQuery.extend(true, {}, globalOptions);

    // set the element where the chart should be rendered
    options.chart.renderTo = settings.renderTo;

    // set the type of chart, static in this case
    options.chart.type = settings.type;

    // set the plat option, empty, normal, percent
    options['plotOptions'] = {column:{stacking:settings.stacking}};

    if(settings.hasOwnProperty('yAxisTitle'))
        options.yAxis.title.text = settings.yAxisTitle;

    // check and set the menu options
    var menus = settings.menu;
    if(settings.hasOwnProperty('menu')) {
        for(var i = 0; i < menus.length; i++) {
            var menuItem = myMenuItems('', menus[i].chart, settings.renderTo, menus[i].title);
            options.exporting.buttons.contextButton.menuItems.push(menuItem);
            menuItem = null;
        }
    }

    // adding data label toggle menu option
    var labelMenu = dataLabelToggleMenu(settings.renderTo);
    options.exporting.buttons.contextButton.menuItems.push(labelMenu);

    // check for color property
    if(settings.hasOwnProperty('colors'))
        options.colors = settings.colors;

    //check for label
    if(settings.hasOwnProperty('label')) {
        options['labels'] = {
            items: [{
                html: settings.label.title,
                style: {
                    left: settings.label.position.left,
                    top: settings.label.position.top,
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        }
    }

    if(settings.hasOwnProperty('legend')) {
        //console.log("we are here in the legend");
        options['legend'] = {
            layout:settings.legend.layout,
            align:settings.legend.align,
            verticalAlign:settings.legend.vAlign,
            floating: settings.legend.floating,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'

        }
    }

    $.ajax({
        url: Routing.generate(settings.apiUrl, settings.urlParams),
        beforeSend: function () {
            // ajax loader path is in the data attribute of the main div
            var path = $("#main").data('ajax-loader');
            $('#'+settings.renderTo).html("<img src='"+path+"' class='ajax-loader'>");
        },
        success: function(data) {
            $('#' + settings.renderTo).html('');
            var obj = JSON.parse(data);
            // set the dynamic title
            options['title'] = {text:obj.title};
            // set the dynamic categories
            options.xAxis.categories = obj.categories;
            // set the data/series
            options.series = obj.series;

            // check for the combined chart request
            if(settings.hasOwnProperty('combination')) {
                var secondCharts = settings.combination;
                for(var i = 0; i < secondCharts.length; i++) {
                    var colors = options.colors;
                    if(secondCharts.hasOwnProperty('colors')) {
                        colors = secondCharts.colors;
                    }
                    var newSettings = secondChart(data, secondCharts[i], colors);
                    options.series.push(newSettings);
                }
            }
            // finally create chart
            var chart = new Highcharts.Chart(options);
        },
        cache: false
    });


}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Helper Functions ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

/*
this function creates menu item
 */
function myMenuItems(sType, tType, renderTo, title) {
    var menuItem = {
        text: title,
        onclick: function () {
            changeChartType(sType, tType, renderTo);
        },
        separator: false
    }
    return menuItem;
}

function dataLabelToggleMenu(renderTo) {
    //var menuItemLabel = [];
    var menuItemLabel = {
        text: 'Toggle Labels',
        onclick: function () {
            toggleLabels(renderTo);
        },
        separator: false
    };
    return menuItemLabel;
}

/*
this function changes chart type, the sourceType is not used till now
 */
function changeChartType(sType, tType, renderTo) {
    var chart = $('#'+renderTo).highcharts(),
        s = chart.series,
        sLen = s.length;
    //chart.settings.tooltip

    for(var i =0; i < sLen; i++){
        s[i].update({
            stacking: tType,
        }, false);
    }
    chart.redraw();
}

/*
this function toggles data labels
 */
function toggleLabels(renderTo) {
    var chart = $('#'+renderTo).highcharts(),
        s = chart.series,
        sLen = s.length;
    //console.log("hello something" + s[0].dataLabels.enabled);
    for(var i =0; i < sLen; i++){
        s[i].update({
            dataLabels: {
                enabled: !s[i].options.dataLabels.enabled
            }
        }, false);
    }
    chart.redraw();

}

/*
this function create the combined charts.
 */
function secondChart(sData, sOptions, sColors) {
    var data = JSON.parse(sData);
    var mData = data.series;
    if(sOptions.type == 'pie' && sOptions.method == 'sum') {
        var tempData = [];
        for(var i = 0; i < mData.length; i++) {
            var name = mData[i].name;
            var data = mData[i].data.reduce(function(prev, cur) {
                return prev + cur;
            });
            var tmpObj = {name: name, y:data, color: sColors[i]};
            //tmpObj[dataName] = dataData;
            tempData.push(tmpObj);
        }
        var pieChart = {
            type: 'pie',
            name: 'Total',
            data: tempData,
            center: [90, 10],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }

        }

        return pieChart;
    } else if(sOptions.type =='spline') {
        var newData = [];
        var arrLength = mData[0].data.length;
        if(sOptions.method == 'average') {
            //newData = null;
            var avg = 0;
            for (var i = 0; i < arrLength; i++) {
                avg = 0;
                for (var x = 0; x < mData.length; x++) {
                    var tmp = mData[x].data;
                    //console.log(tmp);
                    avg = avg + tmp[i];
                }
                newData.push(Math.round(avg / arrLength));
            }
        } else if(sOptions.method == 'sum') {
            //newData = null;
            var sum = 0;
            for (var i = 0; i < arrLength; i++) {
                sum = 0;
                for (var x = 0; x < mData.length; x++) {
                    var tmp = mData[x].data;
                    //console.log(tmp);
                    sum = sum + tmp[i];
                }
                newData.push(sum);
            }
        }
        var lineChart = {
            type: 'spline',
            name: sOptions.method == 'sum'? 'Total': 'Average',
            data: newData,
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: '#ffffff'
            },
            color: Highcharts.getOptions().colors[3]
        }

        return lineChart;
    }
}
