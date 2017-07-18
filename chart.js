
//////////////   Declaracion de variables   \\\\\\\\\\\\

var data1 = [];
var data2 = [];
var selectionBoxes = [];
var bar;
var circles;
var text2;
var tip;
var line;
var svg;


//////////////   Carga de los archivos Json en arrays   \\\\\\\\\\\\\\\\\

function load(){
    d3.json("data.json", function(err, data){
        data1 = data;
        data1.sort(function(a, b){
            return (b.KPI_1 - a.KPI_1)
        })
    })

    d3.json("data2.json", function(err, data){
        data2 = data;
        graphic();
     })
}

/////////////   Metodos para comparar ambos arrays    \\\\\\\\\\\\\\\\\\\\

function compareX(name){
    var result = _.find(data1, function(item){
        return item.NodeName == name;
    });

    if (!result) {
        console.error('link "' + name + '" not found in the nodes data');
    } else {
        return result.X;
    }
}

function compareY(name){
    var result = _.find(data1, function(item){
        return item.NodeName == name;
    });

    if (!result) {
        console.error('link "' + name + '" not found in the nodes data');
    } else {
        return result.Y;
    }
}


//////////////  Creacion de tooltips   \\\\\\\\\\\\\\\

    tip = d3.tip()
     .attr("class", "d3-tip")
     .offset([-10, 0])
     .html(function(d) {
        return d.NodeName + '<br>' + d3.format(',.0f')(d.KPI_1);
     })

    tip2 = d3.tip()
     .attr("class", "d3-tip")
     .offset([-10, 0])
     .html(function(d) {
        return "Beging: "+d.Begin + '<br>' + "End: " + d.End + '<br>' + "Traffic: " + d3.format(',.0f')(d.KPI_1);
     })


//////////////   Dibujado de los graficos   \\\\\\\\\\\

function click(name){
    _.forEach(data2, function(item){
        var result = [];
        if(item.Begin === name){
            result = (name + " in the "+ item.LinkName +" is following to " + item.End);
            console.log(result)
            links.append (result);
        }
    });
}





function graphic(){
    svg = d3.select("body")
            .append("svg")
            .attr("id","svg1")
    svg.call(tip)
    svg.call(tip2)


    line = svg.selectAll("line")
    .data(data2)
    .enter().append("line")
    .attr("id", function(d){
        return d.LinkName;
    })

    line.attr("x1",function(d){
        return compareX(d.Begin);
    })

    .attr("x2", function(d){
        return compareX(d.End); ;
    })

    .attr("y1", function(d){
        return compareY(d.Begin);
    })

    .attr("y2", function(d){
        return compareY(d.End);
    })

    .attr("stroke", "#CEECF5")
    .attr("stroke-width", "2px")

    .on("mouseover", tip2.show)

    .on("mouseout", tip2.hide)

    .on("mouseenter", function(d){
        d3.select(this)
        .attr("stroke-width", "3px")
    })
    .on("mouseleave", function(d){
        d3.select(this)
        .attr("stroke-width", "2px")
    })



    circles = svg.selectAll("circle")
            .data(data1)
            .enter().append("circle")
    circles.attr("cx", function(d){
                return d.X;
            })
            .attr("cy", function(d){
                return d.Y;
            })
            .attr("stroke", "SteelBlue")
            .attr("stroke-width", "1px")

            .attr("id", function(d){
                return d.NodeName;
            })

            .attr("fill", function(d){
                if(d.KPI_1/1000 >=17){
                    return "#FF0000"
                }else
                if(d.KPI_1/1000 >=16){
                    return "#FF8000"
                }else
                if(d.KPI_1/1000 >=15){
                    return "#FACC2E"
                }else
                if(d.KPI_1/1000 >=14){
                    return "#F5DA81"
                }else
                if(d.KPI_1/1000 >=13){
                    return "#088A08"
                }else
                if(d.KPI_1/1000 >=12){
                    return "#38610B"
                }else
                if(d.KPI_1/1000 >=10){
                    return "#5FB404"
                }
            })
            .attr("r", function(d){
                if(d.KPI_1/10000 > 1.7){
                    return 8
                }else if(d.KPI_1/10000 >= 1.6 ){
                    return 7
                }else if(d.KPI_1/10000 >= 1.5 ){
                    return 6
                }else if(d.KPI_1/10000 >= 1.4 ){
                    return 5
                }else{
                    return 4
                }
            })

            .on("mouseover", function(d){
                d3.select(this)
                .attr("stroke-width","3px")

               bar.attr("fill", function(d2){
                   if(d2.NodeName == d.NodeName){
                      return "#2E64FE"
                   }else{
                      return "#CEE3F6"
                   }
               })

               text.attr("stroke", function(d2){
                   if(d.NodeName == d2.NodeName){
                      return "black"
                   }else{
                      return "none"
                   }
               })

               text2.attr("stroke", function(d2){
                    if(d.NodeName == d2.NodeName){
                       return "black"
                    }else{
                       return "#none"
                    }
               })
            })
           .on("mouseenter", tip.show)

           .on("click", function(d){
                click(d.NodeName)
            })

            .on("mouseout",function(d){
                 d3.select(this)
                 .attr("stroke-width", "1px")
                 bar.attr("fill", "#A9BCF5")
                 text.attr("stroke","none")
                 text2.attr("stroke","none")
            })
            .on("mouseleave", tip.hide)

            svg.append("text")
                .attr("x", 100)
                .attr("y", 300)
                .style("font-family","century gothic")
                .style("font-size", "0.8em")
                .text("19000")

            svg.append("circle")
                .attr("cx", 90)
                .attr("cy", 295)
                .attr("r", 8)
                .attr("fill", "#FF0000")
                .attr("stroke-width", "1px")
                .attr("stroke", "SteelBlue")
                .on("mouseover", function(d){
                    d3.select(this)
                    .attr("stroke-width","3px")
                })
                .on("mouseout", function(){
                    d3.select(this)
                    .attr("stroke-width", "1px")
                })

            svg.append("text")
                .attr("x", 160)
                .attr("y", 300)
                .style("font-family","century gothic")
                .style("font-size", "0.8em")
                .text("14.000")

            svg.append("circle")
                .attr("cx", 150)
                .attr("cy", 295)
                .attr("r", 5)
                .attr("fill", "#F5DA81")
                .attr("stroke-width", "1px")
                .attr("stroke", "SteelBlue")
                .on("mouseover", function(d){
                    d3.select(this)
                    .attr("stroke-width","3px")
                })
                .on("mouseout", function(){
                    d3.select(this)
                    .attr("stroke-width", "1px")
                })

            svg.append("text")
                .attr("x", 220)
                .attr("y", 300)
                .style("font-family","century gothic")
                .style("font-size", "0.8em")
                .text("10.000")

            svg.append("circle")
                .attr("cx", 210)
                .attr("cy", 295)
                .attr("r", 4)
                .attr("fill", "#5FB404")
                .attr("stroke-width", "1px")
                .attr("stroke", "SteelBlue")
                .on("mouseover", function(d){
                    d3.select(this)
                    .attr("stroke-width","3px")
                })
                .on("mouseout", function(){
                    d3.select(this)
                    .attr("stroke-width", "1px")
                })

    var svg2 = d3.select("body")
            .append("svg")
            .attr("id","svg2")

    bar = svg2.selectAll("rect")
            .data(data1)
            .enter().append("rect")
            .attr("id", function(d){
                return d.NodeName;
            })

    bar.attr("x", 120)
            .attr("y", 0)
            .attr("height", 0)
            .attr("display", "block")
            .attr("margin-top", "0.1.px")

            .attr("width", function(d){
                 return d.KPI_1/100 ;
            })
            .attr("y", function(d, i){
                 return i * 21 + 15;
            })

            .attr("fill", "#A9BCF5")

            .on("mouseover", function(d){
                  var xPos2 = d3.mouse(this)[0] +5;
                  var yPos2 = d3.mouse(this)[1] -5;

                  d3.select(this)
                  .attr("fill", "#2E64FE")

                  circles.attr("stroke-width", function(d2){
                    if (d2.NodeName == d.NodeName){
                        return 3;
                    }else{
                        return 1;
                    }
                  })
                text.attr("stroke", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "black";
                    }else{
                        return "none"
                    }
                })
                text2.attr("stroke", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "black";
                    }else{
                        return "none"
                    }
                })
            })

            .on("mouseout", function(){
                  d3.select(this)
                  .attr("fill", "#A9BCF5")
                  circles.attr("stroke-width", 1)
                  text.attr("stroke", "none")
                  text2.attr("stroke", "none")
            })

            .text(function(d){
                return d.KPI_1;
            })
            .transition()
            .delay(function(d, i){
                return i * 100;
            })
            .duration(1000)
            .attr("height", function(d){
                return 18;
            })


        text = svg2.selectAll("text")
            .data(data1)
            .enter().append("text")
            .attr("id", function(d){
                return d.NodeName;
            })

        text.text(function(d){
                return d3.format(',.0f')(d.KPI_1);
            })
            .attr("x", function(d){
                return d.KPI_1/100 +130
            })
            .attr("y", function(d, i){
                return i * 21 +28;
            })
            .attr("font-size","13px")
            .style("font-family", "century gothic")
            .on("mouseover", function(d){
                d3.select(this)
                .attr("stroke", "black")

                bar.attr("fill", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "#2E64FE";
                    }else{
                        return "#A9BCF5";
                    }
                })
                text2.attr("stroke", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "black";
                    }else{
                        return "none"
                    }
                })
                circles.attr("stroke-width", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "3px";
                    }else{
                        return "1px"
                    }
                })
            })
            .on("mouseout", function(d){
                d3.select(this)
                .attr("stroke", "none")
                bar.attr("fill", "#A9BCF5")
                circles.attr("stroke-width", "1px")
                text2.attr("stroke", "none")
            })

        text2 = svg2.selectAll("text2")
            .data(data1)
            .enter().append("text")
            .attr("id", function(d){
                return d.NodeName;
            })

        text2.text(function(d){
                 return d.NodeName;
            })
            .attr("x", function(d){
                 return -0
            })
            .attr("y", function(d, i){
                 return i * 21 + 28;
            })
            .attr("font-size","13px")
            .style("font-family", "century gothic")
            .on("mouseover", function(d){
                d3.select(this)
                .attr("stroke", "black")

                bar.attr("fill", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "#2E64FE";
                    }else{
                        return "#A9BCF5";
                    }
                })

                text.attr("stroke", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "black";
                    }else{
                        return "none"
                    }
                })
                circles.attr("stroke-width", function(d2){
                    if(d.NodeName == d2.NodeName){
                        return "3px";
                    }else{
                        return "1px"
                    }
                })
            })
            .on("mouseout", function(d){
                d3.select(this)
                .attr("stroke", "none")
                bar.attr("fill", "#A9BCF5")
                circles.attr("stroke-width", "1px")
                text.attr("stroke", "none")
            })




////////////   Sistema de creacion de ComboBox y filtrado de datos parametrizado   \\\\\\\\\\\\\\\\\\

            function createSelectionBoxes(object) {
                var filters = getFilters(object);
                var form = document.getElementById('form');
                var titles = document.getElementById('title')

                _.forEach(filters, function(filterName) {
                    createTitle(filterName, title);
                    createSelectionBox(filterName, form);
                });
            }

            createSelectionBoxes(data1[0]);
                _.forEach(selectionBoxes, function(selectionBox) {
                    selectionBox.addEventListener('change', onSelectionChange);
                });

            function getFilters(object) {
                return _.chain(object)
                    .keys()
                    .filter(function(value, index) {
                        return value.substr(0,6) === "Filter";
                    })
                    .map(function(value, index) {
                        return value.substr(7, value.length + 1)
                    })
                    .value()
            }

            function createSelectionBox(filterName, form) {
                var selectionBox = document.createElement('select');
                selectionBox.id = filterName;


                form.appendChild(selectionBox);
                selectionBoxes.push(selectionBox);

                createSelectionOptions(filterName, selectionBox);
            }

            function createSelectionOptions(filterName, selectionBox) {
                var option = document.createElement('option');
                option.value = 'noFilter';
                option.text = 'All';
                selectionBox.append(option);

                _.chain(data1)
                    .map(function(object) {
                        return object['Filter_' + filterName];
                    })
                    .uniq()
                    .forEach(function(filterValue) {
                        var option = document.createElement('option');
                        option.value = filterValue;
                        option.text = filterValue;
                        selectionBox.append(option);
                    })

                    .value();
            }

            function createTitle(filterName, titles){
                _.chain('select')
                    .map(function(object) {
                        return object['Filter_' + filterName];
                    })
                    .uniq()
                    .forEach(function(filterValue) {
                        var title = document.createElement('title');
                        title.value = filterValue;
                        title.text = filterName;
                        titles.appendChild(title);
                    })
                    .value();
            }

            function onSelectionChange(event) {
                _.forEach(circles[0], function(c){
                    c.style.display = "";
                });
                _.forEach(text[0], function(t){
                    t.style.display = "";
                });
                _.forEach(bar[0], function(t){
                    t.style.display = "";
                });
                _.forEach(text2[0], function(t){
                    t.style.display = "";
                });

                var filterName = "Filter_" + event.currentTarget.id
                var filterValue = event.currentTarget.value
                console.log(filterName, filterValue);
                console.log(filterValue);

                var selectionBoxValues=[];
                _.forEach(selectionBoxes, function(selectionBox){
                    selectionBoxValues.push(selectionBox.value);
                });

                if(filterValue == "noFilter"){
                    _.forEach(selectionBoxValues, function(f){
                        f.selectionBoxValues == 'noFilter';
                    })
                };

                console.log(selectionBoxValues);



                var newData1 = _.filter(data1, function(d){
                    return d[filterName] !== filterValue;
                });

                _.forEach(newData1, function(d){
                    foundCircle = _.filter(circles[0], function(l){
                        return l.id === d['NodeName'];
                    });

                    if(foundCircle && foundCircle[0]){
                        foundCircle[0].style.display = "none";
                    }
                    if(filterValue == "noFilter"){
                        foundCircle[0].style.display = "";
                    }
                });

                var newTextData = _.filter(data1, function(d){
                    return d[filterName] !== filterValue;
                });

                _.forEach(newTextData, function(d){
                    foundText = _.filter(text[0], function(l){
                        return l.id === d['NodeName'];
                    });

                    if(foundText && foundText[0]){
                        foundText[0].style.display = "none";
                    }
                    if(filterValue == "noFilter"){
                        foundText[0].style.display = "";
                        _.forEach("select", function(d){
                            d.selectionBox === "All";
                        })
                    }
                });

                var newText2Data = _.filter(data1, function(d){
                    return d[filterName] !== filterValue;
                });

                _.forEach(newTextData, function(d){
                    foundText = _.filter(text2[0], function(l){
                        return l.id === d['NodeName'];
                    });

                    if(foundText && foundText[0]){
                        foundText[0].style.display = "none";
                    }
                    if(filterValue == "noFilter"){
                        foundText[0].style.display = "";
                        _.forEach("select", function(d){
                            d.selectionBox === "All";
                        })
                    }
                });

                var newBarData = _.filter(data1, function(d){
                    return d[filterName] !== filterValue;
                });

                _.forEach(newTextData, function(d){
                    foundText = _.filter(bar[0], function(l){
                        return l.id === d['NodeName'];
                    });

                    if(foundText && foundText[0]){
                        foundText[0].style.display = "none";
                    }
                    if(filterValue == "noFilter"){
                        foundText[0].style.display = "";
                        _.forEach("select", function(d){
                            d.selectionBox === "All";
                        })
                    }
                });
            }
}

