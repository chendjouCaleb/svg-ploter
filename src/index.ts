import {Figure} from "./antenna/core/figure";

let figure = new Figure(document.getElementById("figure"));
figure.width = 500;
figure.height = 500;

let graph = figure.addGraph(50, 50);

graph.borderColor = "red";
graph.borderWidth = 5;
graph.backgroundColor = "#9933ff";
graph.backgroundOpacity = .1;
graph.xdomain = [-100, 100];
graph.ydomain = [-100, 100];

graph.addFunction(x => x *x);

let graph2 = figure.addGraph(152, 50);
graph2.width = 200;
graph2.height = 200;

graph2.borderColor = "red";