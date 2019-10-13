import { Engine, Scene, ArcRotateCamera, FreeCamera, Vector3, Color3, HemisphericLight, Mesh, StandardMaterial } from '@babylonjs/core';
import { GUI3DManager, Rectangle, AdvancedDynamicTexture, TextBlock, MultiLine, Ellipse, Control, StackPanel } from '@babylonjs/gui';

function createSphere(scene:Scene, overlay: AdvancedDynamicTexture, name:string, size:number, position:Vector3, color:Color3) : Mesh {
    var material = new StandardMaterial("material for : "+name, scene);
    material.diffuseColor = color;

    var mesh = Mesh.CreateSphere(name, 10, size, scene);
    mesh.position = position;
    mesh.material = material;

    var plane = Mesh.CreatePlane("plane - "+mesh.name, 10, scene);
    plane.parent = mesh;
    //plane.position.x = 0;
    plane.position.y = size*0.8;

    var advancedTexture = AdvancedDynamicTexture.CreateForMesh(plane);
    var panel2 = new StackPanel();  
    advancedTexture.addControl(panel2);

    var label = new Rectangle("label for " + mesh.name);
    label.background = "black"
    label.height = "60px";
    label.alpha = 0.5;
    label.width = "150px";
    label.cornerRadius = 20;
    label.thickness = 2;
    label.linkWithMesh(mesh);
    advancedTexture.addControl(label); 

    var text1 = new TextBlock();
    text1.text = mesh.name;
    text1.color = "white";
    text1.textWrapping = true;
    text1.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    label.addControl(text1);  

    var endRound = new Ellipse();
    endRound.width = "10px";
    endRound.background = "black";
    endRound.height = "10px";
    endRound.color = "white";
    overlay.addControl(endRound);
    endRound.linkWithMesh(mesh);
    
    return mesh;
} 

function addLineBetween(overlay: AdvancedDynamicTexture, source:Mesh, destination:Mesh) {
    var line = new MultiLine()
    line.alpha = 0.5;
    line.lineWidth = 5;
    line.dash = [5,10];
    line.add(source);
    line.add(destination);
    overlay.addControl(line);
}

export class App {

    attached() {
        const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
        const engine = new Engine(canvas);
        var scene = new Scene(engine);

        var overlay = AdvancedDynamicTexture.CreateFullscreenUI("ui1");

 
        var camera = new ArcRotateCamera("Camera", -Math.PI / 2, 1.0, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);        
        
        //var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        //camera.setTarget(Vector3.Zero());
        //camera.attachControl(canvas, true);

        var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;

        var lmp = createSphere(scene, overlay, "Line Management Planner", 2, new Vector3(0,0,0), Color3.Teal());
        var rm = createSphere(scene, overlay, "Rope Management", 1, new Vector3(3,0,0), Color3.Blue());
        addLineBetween(overlay, lmp, rm);

        var rmCSharp = createSphere(scene, overlay, "C#", 0.5, new Vector3(4.5,0,0), Color3.Green());
        addLineBetween(overlay, rm, rmCSharp);

        var eventProcessors = createSphere(scene, overlay, "Event Processors", 0.25, new Vector3(5.2,0,0), Color3.Yellow());
        addLineBetween(overlay, rmCSharp, eventProcessors);


        var mongoDB = createSphere(scene, overlay, "MongoDB", 0.5, new Vector3(4,-1.5,0), Color3.Gray());
        addLineBetween(overlay, rm, mongoDB);

        var mongoDBTenant1 = createSphere(scene, overlay, "Tenant 1", 0.25, new Vector3(4.7,-1.5,0), Color3.Red());
        addLineBetween(overlay, mongoDB, mongoDBTenant1);

        var mongoDBTenant2 = createSphere(scene, overlay, "Tenant 2", 0.25, new Vector3(4.3,-2,0), Color3.Red());
        addLineBetween(overlay, mongoDB, mongoDBTenant2);

        var analytics = createSphere(scene, overlay, "Analytics", 1, new Vector3(2,2,0), Color3.Blue());



        
        addLineBetween(overlay, lmp, analytics);


        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}