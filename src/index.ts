import {Figure} from "./antenna/core/figure";
import {UnitSize} from "./antenna/core/unit-size";

let figure = new Figure(document.getElementById("figure"));
figure.width = 600;
figure.height = 500;

let graph = figure.addGraph(10, 10);
graph.addFunction(x => x *x *x);

let graph1 = figure.addGraph(180, 10);
graph1.addFunction(x => x *x );

let graph2 = figure.addGraph(360, 10);
graph2.addFunction(x => Math.abs(x));

let graph3 = figure.addGraph(10, 180);
graph3.addFunction(x => Math.cos(x));

let graph4 = figure.addGraph(180, 180);
graph4.addFunction(x => Math.sin(x));

let graph5 = figure.addGraph(360, 180);
graph5.addFunction(x => Math.tan(x));

let graph6 = figure.addGraph(10, 360);
graph6.addFunction(x => Math.exp(x));

let graph7 = figure.addGraph(180, 360);
graph7.xDomain = [0, 10];

// let graph2 = figure.addGraph(152, 50);
// graph2.width = 200;
// graph2.height = 200;
//
// graph2.borderColor = "red";